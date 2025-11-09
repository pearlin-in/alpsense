import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Terminal from './components/Terminal';
import './styles/App.css';

function App() {
  const [isPythonMode, setIsPythonMode] = useState(true);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [pythonVersion, setPythonVersion] = useState('');

  // Check backend connection and Python version
  useEffect(() => {
    checkBackendConnection();
    checkPythonVersion();
  }, []);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        setIsBackendConnected(true);
        setOutput('✅ ALPSENSE Python IDE Ready!\n🚀 Write Python code and click Run.');
      } else {
        setIsBackendConnected(false);
      }
    } catch (error) {
      setIsBackendConnected(false);
      setOutput('❌ Backend server not running.\n\nPlease run: cd server && npm start');
    }
  };

  const checkPythonVersion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/python-version');
      const data = await response.json();
      setPythonVersion(data.version || 'Unknown');
    } catch (error) {
      setPythonVersion('Not detected');
    }
  };

  // Execute Python code
  const executePythonCode = async (code) => {
    if (!isBackendConnected) {
      setOutput('❌ Backend not connected. Please start the server first.');
      return;
    }

    setIsLoading(true);
    setOutput('🚀 Executing Python code...\n');

    try {
      const response = await fetch('http://localhost:5000/api/execute-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.success) {
        setOutput(data.output || '✅ Code executed successfully (no output)');
      } else {
        setOutput(`❌ Execution failed:\n${data.output}`);
      }
    } catch (error) {
      setOutput(`❌ Connection error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute terminal command
  const executeTerminalCommand = async (command) => {
    if (command.trim().toLowerCase() === 'clear') {
      setOutput('');
      return;
    }

    if (command.trim().toLowerCase() === 'help') {
      setOutput(prev => prev + '\n💡 Available commands: clear, help, python --version');
      return;
    }

    // If it looks like Python code, execute it
    if (command.trim() && !command.trim().startsWith('#')) {
      try {
        const response = await fetch('http://localhost:5000/api/execute-python', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: command }),
        });

        const data = await response.json();
        
        if (data.success) {
          setOutput(prev => prev + `\n>>> ${command}\n${data.output}`);
        } else {
          setOutput(prev => prev + `\n>>> ${command}\n❌ ${data.output}`);
        }
      } catch (error) {
        setOutput(prev => prev + `\n>>> ${command}\n❌ Error: ${error.message}`);
      }
    } else {
      setOutput(prev => prev + `\n>>> ${command}`);
    }
  };

  return (
    <div className="App">
      <Layout 
        isPythonMode={isPythonMode}
        onExecuteCode={executePythonCode}
        output={output}
        isLoading={isLoading}
        isBackendConnected={isBackendConnected}
      />
      
      <div className="bottom-controls">
        <div className="control-group">
          <div className="python-switch-container">
            <span className="switch-label">Python IDE</span>
            <div className="python-version">
              {pythonVersion}
            </div>
          </div>
          
          <button 
            className={`control-btn-terminal ${showTerminal ? 'active' : ''}`}
            onClick={() => setShowTerminal(!showTerminal)}
          >
            {showTerminal ? '📁 Hide Terminal' : '💻 Show Terminal'}
          </button>
          
          <button className="control-btn-download">📥 Export</button>
          
          <div className={`connection-status ${isBackendConnected ? 'connected' : 'disconnected'}`}>
            {isBackendConnected ? '✅ Connected' : '❌ Disconnected'}
          </div>
        </div>
      </div>

      {showTerminal && (
        <Terminal 
          onExecuteCommand={executeTerminalCommand}
          onClose={() => setShowTerminal(false)}
        />
      )}
    </div>
  );
}

export default App;