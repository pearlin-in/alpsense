import React, { useState } from 'react';
import Layout from './components/Layout';
import './styles/App.css';

function App() {
  const [isPythonMode, setIsPythonMode] = useState(false);

  return (
    <div className="App">
      <Layout isPythonMode={isPythonMode} />
      <div className="bottom-controls">
        <div className="python-switch-container">
          <span className="switch-label">Python Mode</span>
          <label className="python-switch">
            <input 
              type="checkbox" 
              checked={isPythonMode}
              onChange={(e) => setIsPythonMode(e.target.checked)}
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