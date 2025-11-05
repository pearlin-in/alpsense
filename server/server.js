const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Execute Python code
app.post('/api/execute-python', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.json({
      success: false,
      output: 'No code provided',
      error: true
    });
  }

  // Create a temporary Python file
  const tempFile = path.join(tempDir, `script_${Date.now()}.py`);
  fs.writeFileSync(tempFile, code);

  // Execute the Python script
  exec(`python "${tempFile}"`, (error, stdout, stderr) => {
    // Clean up the temporary file
    fs.unlinkSync(tempFile);

    if (error) {
      return res.json({
        success: false,
        output: `Error: ${error.message}\n${stderr}`,
        error: true
      });
    }

    if (stderr) {
      return res.json({
        success: false,
        output: `Execution Error: ${stderr}`,
        error: true
      });
    }

    res.json({
      success: true,
      output: stdout || 'Code executed successfully (no output)',
      error: false
    });
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(` ALPSENSE Backend Server running on http://localhost:${PORT}`);
  console.log(` Python execution endpoint: http://localhost:${PORT}/api/execute-python`);
  console.log(`  Health check: http://localhost:${PORT}/api/health`);
});