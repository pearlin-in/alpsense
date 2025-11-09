import React, { useState, useEffect } from 'react';
import OutputScreen from './OutputScreen';
import BlockEditor from './BlockEditor';
import { generatePythonCode } from './pythonGenerator';
import '../styles/CodingInterface.css';

const CodingInterface = ({ 
  isPythonMode, 
  onExecuteCode, 
  output, 
  isLoading,
  navActiveItem,
  selectedNavOption,
  blocks,
  setBlocks
}) => {
  

  // Python editor state
  const [code, setCode] = useState('');

  // Whenever blocks change OR Python mode is activated, update the editor with generated code
  useEffect(() => {
    if (isPythonMode) {
      const blockCode = generatePythonCode(blocks);
      setCode(blockCode || "# Write your Python code here...\n");
    }
  }, [blocks, isPythonMode]);

  const handleRunCode = () => {
    onExecuteCode(code);
  };

  const handleClear = () => {
    setCode('# Write your Python code here...\n\n');
    onExecuteCode('');
  };

  const handleSave = () => {
    alert('Python code saved! (In a real app, this would save to file/database)');
  };

  if (isPythonMode) {
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
  }

  // Block mode
  return (
    <div className="coding-interface block-mode-center">
      <div className="editor-container">
        <div className="editor-header">
          <span>Block Editor</span>
          <div className="editor-controls">
            <button className="control-btn clear" onClick={() => setBlocks([])}>Clear Blocks</button>
          </div>
        </div>

        <div className="block-editor-area">
          <BlockEditor blocks={blocks} setBlocks={setBlocks} />
        </div>
      </div>

      <OutputScreen output={output} isLoading={isLoading} />
    </div>
  );
};

export default CodingInterface;
