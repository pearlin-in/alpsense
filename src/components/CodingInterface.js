import React, { useState } from 'react';
import OutputScreen from './OutputScreen';
import '../styles/CodingInterface.css';

const CodingInterface = ({ 
  isPythonMode, 
  onExecuteCode, 
  output, 
  isLoading,
  isBackendConnected,
  onStopExecution
}) => {
  const [code, setCode] = useState(`# ALPSENSE Python Playground
# Try these interactive examples!

# Example 1: Basic input
name = input("What's your name? ")
print(f"Hello, {name}! 👋")

# Example 2: Number input
age = int(input("How old are you? "))
print(f"You are {age} years old!")

# Example 3: Multiple inputs
color = input("What's your favorite color? ")
print(f"{color} is a beautiful color! 🌈")

# Example 4: Calculator
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
print(f"{num1} + {num2} = {num1 + num2}")

# Example 5: Loop with input
for i in range(2):
    item = input(f"Enter item {i+1}: ")
    print(f"Added: {item}")

print("🎉 All done! Thanks for using ALPSENSE!")

# Try your own interactive code below!
`);

  const handleRunCode = () => {
    if (!isBackendConnected) {
      alert('Backend server not connected! Please make sure the server is running on port 5000.');
      return;
    }
    onExecuteCode(code);
  };

  const handleClear = () => {
    setCode('# Write your Python code here\n\nprint("Start coding! 🚀")');
  };

  const handleSave = () => {
    alert('💾 Code saved! (This would save to file in a real application)');
  };

  return (
    <div className="coding-interface">
      <div className="editor-container">
        <div className="editor-header">
          <span>Python Editor {!isBackendConnected && ' (Offline)'}</span>
          <div className="editor-controls">
            <button 
              className="control-btn run" 
              onClick={handleRunCode}
              disabled={isLoading || !isBackendConnected}
            >
              {isLoading ? '⚡ Running...' : '🚀 Run'}
            </button>
            {isLoading && (
              <button 
                className="control-btn stop"
                onClick={onStopExecution}
              >
                🛑 Stop
              </button>
            )}
            <button className="control-btn clear" onClick={handleClear}>
              🗑️ Clear
            </button>
            <button className="control-btn save" onClick={handleSave}>
              💾 Save
            </button>
          </div>
        </div>

        
        
        <div className="code-editor-container">
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="# Write your Python code here..."
            disabled={!isBackendConnected}
          />
          {!isBackendConnected && (
            <div className="offline-overlay">
              <div className="offline-message">
                <h3>🔌 Backend Server Offline</h3>
                <p>To run Python code:</p>
                <ol>
                  <li>Open a new terminal</li>
                  <li>Run: <code>cd server</code></li>
                  <li>Run: <code>npm start</code></li>
                  <li>Wait for "Server running on http://localhost:5000"</li>
                  <li>Refresh this page</li>
                </ol>
                <p><strong>Also make sure Python is installed on your system!</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <OutputScreen 
        output={output}
        isLoading={isLoading}
        isBackendConnected={isBackendConnected}
      />
    </div>
  );
};

export default CodingInterface;