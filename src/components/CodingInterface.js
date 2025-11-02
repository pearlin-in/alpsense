import React, { useState } from 'react';
import OutputScreen from './OutputScreen';
import BlockInterface from './BlockInterface';
import '../styles/CodingInterface.css';

const CodingInterface = ({ isPythonMode, isBlockMode, activeLeftNavItem }) => {
  const [code, setCode] = useState('// Write your code here...\n\nfunction main() {\n  // Your logic goes here\n  console.log("Hello ALPSENSE!");\n}');

  const pythonCode = `# Python mode activated\n\ndef main():\n    # Your Python logic here\n    print("Hello ALPSENSE in Python!")\n\nif __name__ == "__main__":\n    main()`;

  return (
    <div className="coding-interface">
      {isBlockMode ? (
        <BlockInterface isPythonMode={isPythonMode} activeBlock={activeLeftNavItem} />
      ) : (
        <div className="editor-container">
          <div className="editor-header">
            <span>
              {isPythonMode ? 'Python Editor' : 'Code Editor'} 
              {activeLeftNavItem && ` - Selected: ${activeLeftNavItem}`}
            </span>
            <div className="editor-controls">
              <button className="control-btn run">Run</button>
              <button className="control-btn clear">Clear</button>
              <button className="control-btn save">Save</button>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={isPythonMode ? pythonCode : code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            readOnly={isPythonMode}
          />
        </div>
      )}
      <OutputScreen />
    </div>
  );
};

export default CodingInterface;