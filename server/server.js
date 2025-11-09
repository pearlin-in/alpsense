const express = require('express');
const cors = require('cors');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store active Python processes
const activeProcesses = new Map();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ALPSENSE Backend is running',
    python: 'Available'
  });
});

// Execute Python code with REAL terminal-like behavior
app.post('/api/execute-python', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({
      success: false,
      output: 'Error: No code provided',
      error: true
    });
  }

  const executionId = Date.now().toString();
  
  // Create a temporary Python file
  const tempFile = path.join(__dirname, 'temp', `exec_${executionId}.py`);
  const tempDir = path.join(__dirname, 'temp');
  
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  try {
    // Write the Python code to a temporary file
    fs.writeFileSync(tempFile, code);

    let output = [];
    let processEnded = false;

    // Spawn Python process
    const pythonProcess = spawn('python', [tempFile], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Store process info
    activeProcesses.set(executionId, {
      process: pythonProcess,
      tempFile: tempFile
    });

    // Handle stdout (normal output)
    pythonProcess.stdout.on('data', (data) => {
      const text = data.toString();
      output.push(text);
    });

    // Handle stderr (errors)
    pythonProcess.stderr.on('data', (data) => {
      const text = data.toString();
      output.push(`ERROR: ${text}`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      processEnded = true;
      
      // Clean up temp file
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      } catch (e) {}
      
      activeProcesses.delete(executionId);
      
      res.json({
        success: true,
        output: output.join(''),
        executionId: executionId,
        exitCode: code
      });
    });

    // Handle process errors
    pythonProcess.on('error', (error) => {
      processEnded = true;
      
      // Clean up temp file
      try {
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      } catch (e) {}
      
      activeProcesses.delete(executionId);
      
      res.json({
        success: false,
        output: `Failed to start Python: ${error.message}`,
        error: true
      });
    });

    // Handle client disconnect
    req.on('close', () => {
      if (!processEnded && pythonProcess) {
        pythonProcess.kill();
        
        // Clean up temp file
        try {
          if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
          }
        } catch (e) {}
        
        activeProcesses.delete(executionId);
      }
    });

  } catch (error) {
    res.json({
      success: false,
      output: `Server error: ${error.message}`,
      error: true
    });
  }
});

// Execute Python code in interactive mode (REPL-like)
app.post('/api/execute-interactive', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({
      success: false,
      output: 'Error: No code provided',
      error: true
    });
  }

  const executionId = Date.now().toString();
  
  let output = [];
  let pythonProcess;

  try {
    // Spawn Python in interactive mode
    pythonProcess = spawn('python', ['-i', '-c', code], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    activeProcesses.set(executionId, {
      process: pythonProcess,
      tempFile: null
    });

    // Handle stdout
    pythonProcess.stdout.on('data', (data) => {
      const text = data.toString();
      output.push(text);
      
      // Send real-time output
      res.write(`data: ${JSON.stringify({
        type: 'output',
        data: text,
        executionId: executionId
      })}\n\n`);
    });

    // Handle stderr
    pythonProcess.stderr.on('data', (data) => {
      const text = data.toString();
      output.push(text);
      
      res.write(`data: ${JSON.stringify({
        type: 'error',
        data: text,
        executionId: executionId
      })}\n\n`);
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      activeProcesses.delete(executionId);
      
      res.write(`data: ${JSON.stringify({
        type: 'close',
        data: `Process exited with code ${code}`,
        executionId: executionId
      })}\n\n`);
      
      res.end();
    });

    // Set headers for Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

  } catch (error) {
    res.json({
      success: false,
      output: `Failed to start interactive Python: ${error.message}`,
      error: true
    });
  }
});

// Send input to a running process
app.post('/api/send-input', (req, res) => {
  const { executionId, input } = req.body;

  try {
    const processInfo = activeProcesses.get(executionId);
    
    if (!processInfo || !processInfo.process) {
      return res.json({
        success: false,
        message: 'Process not found or already completed'
      });
    }

    // Send input to the Python process
    processInfo.process.stdin.write(input + '\n');
    
    res.json({
      success: true,
      message: 'Input sent successfully'
    });
    
  } catch (error) {
    res.json({
      success: false,
      message: `Error sending input: ${error.message}`
    });
  }
});

// Kill a running process
app.post('/api/kill-process', (req, res) => {
  const { executionId } = req.body;

  try {
    const processInfo = activeProcesses.get(executionId);
    
    if (processInfo && processInfo.process) {
      processInfo.process.kill();
      
      // Clean up temp file if exists
      if (processInfo.tempFile && fs.existsSync(processInfo.tempFile)) {
        fs.unlinkSync(processInfo.tempFile);
      }
      
      activeProcesses.delete(executionId);
    }
    
    res.json({
      success: true,
      message: 'Process terminated'
    });
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
});

// Get Python version
app.get('/api/python-version', (req, res) => {
  exec('python --version', (error, stdout, stderr) => {
    if (error) {
      return res.json({
        success: false,
        version: 'Python not found or not in PATH'
      });
    }
    
    res.json({
      success: true,
      version: stdout || stderr
    });
  });
});

// Homepage
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>ALPSENSE Python Backend</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #1a1a2e; color: #00ff88; }
            .container { max-width: 800px; margin: 0 auto; }
            .status { background: #095B4F; padding: 20px; border-radius: 10px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 ALPSENSE Python Backend</h1>
            <div class="status">
                <h2>✅ Server Running on Port ${PORT}</h2>
                <p>Use the frontend at <a href="http://localhost:3000" style="color: #00ccff;">http://localhost:3000</a></p>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 ALPSENSE Python Backend running on http://localhost:${PORT}`);
});