import React, { useState } from 'react';
import Layout from './components/Layout';
import './styles/App.css';
import { generatePythonCode } from './components/pythonGenerator'; 

function App() {
  const [isPythonMode, setIsPythonMode] = useState(true);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [navActiveItem, setNavActiveItem] = useState(null);
  const [selectedNavOption, setSelectedNavOption] = useState(null);
  const [blocks, setBlocks] = useState([]);

  // ✅ Generate Python code from current workspace blocks
  const currentPythonCode = generatePythonCode(blocks);

  // Function to execute Python code
  const executePythonCode = async (code = currentPythonCode) => {
    setIsLoading(true);
    setOutput('Executing code...');
    
    try {
      const response = await fetch('http://localhost:5000/api/execute-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        onExecuteCode={() => executePythonCode(currentPythonCode)} 
        output={output}
        isLoading={isLoading}
        navActiveItem={navActiveItem}
        setNavActiveItem={setNavActiveItem}
        selectedNavOption={selectedNavOption}
        setSelectedNavOption={setSelectedNavOption}
        blocks={blocks}
        setBlocks={setBlocks}
        currentPythonCode={currentPythonCode}  
      />

      <div className="bottom-controls">
        <div className="python-switch-container">
          <span className="switch-label">Editor Mode</span>
          <label className="python-switch">
            <input 
              type="checkbox" 
              checked={isPythonMode}
              onChange={(e) => setIsPythonMode(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <span style={{ marginLeft: 8 }}>{isPythonMode ? 'Python' : 'Blocks'}</span>
        </div>

        <button 
          className="control-btn-download"
          onClick={() => {
            const blob = new Blob([currentPythonCode], { type: 'text/x-python' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'script.py';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
