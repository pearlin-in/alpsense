import React, { useState } from 'react';
import Layout from './components/Layout';
import './styles/App.css';

function App() {
  const [isPythonMode, setIsPythonMode] = useState(true); // Always true for now
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to execute Python code
  const executePythonCode = async (code) => {
    setIsLoading(true);
    setOutput('Executing code...');
    
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
        setOutput(data.output);
      } else {
        setOutput(`Error: ${data.output}`);
      }
    } catch (error) {
      setOutput(`Connection error: Make sure the backend server is running on port 5000\nError: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Layout 
        isPythonMode={isPythonMode}
        onExecuteCode={executePythonCode}
        output={output}
        isLoading={isLoading}
      />
      <div className="bottom-controls">
        <div className="python-switch-container">
          <span className="switch-label">Python Mode</span>
          <label className="python-switch">
            <input 
              type="checkbox" 
              checked={isPythonMode}
              onChange={(e) => setIsPythonMode(e.target.checked)}
              disabled // Disabled for now since we're only doing Python
            />
            <span className="slider"></span>
          </label>
        </div>
        <button className="control-btn-download">Download</button>
      </div>
    </div>
  );
}

export default App;