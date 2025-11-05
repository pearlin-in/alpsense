import React, { useState } from 'react';
import OutputScreen from './OutputScreen';
import '../styles/CodingInterface.css';

const CodingInterface = ({ 
  isPythonMode, 
  onExecuteCode, 
  output, 
  isLoading
}) => {
  const [code, setCode] = useState(`# Welcome to ALPSENSE Python Editor!
# Write your Python code here and click Run to see the output.

print("Hello ALPSENSE!")

# Example: Simple calculator
def add_numbers(a, b):
    return a + b

result = add_numbers(5, 3)
print(f"5 + 3 = {result}")

# Example: Loop
for i in range(3):
    print(f"Count: {i}")

# Your code goes below:
`);

  const handleRunCode = () => {
    onExecuteCode(code);
  };

  const handleClear = () => {
    setCode('# Write your Python code here\n\n');
    onExecuteCode('');
  };

  const handleSave = () => {
    // Simple save functionality - just alert for now
    alert('Python code saved! (In a real app, this would save to file/database)');
  };

  return (
    <div className="coding-interface">
      <div className="editor-container">
        <div className="editor-header">
          <span>Python Editor</span>
          <div className="editor-controls">
            <button 
              className="control-btn run" 
              onClick={handleRunCode}
              disabled={isLoading}
            >
              {isLoading ? 'Running...' : 'Run'}
            </button>
            <button className="control-btn clear" onClick={handleClear}>
              Clear
            </button>
            <button className="control-btn save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
        
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          placeholder="# Write your Python code here..."
        />
      </div>
      
      <OutputScreen 
        output={output}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CodingInterface;