import React, { useState } from 'react';
import OutputScreen from './OutputScreen';
import '../styles/CodingInterface.css';

const CodingInterface = () => {
  const [code, setCode] = useState('// Write your code here...\n\nfunction main() {\n  // Your logic goes here\n  console.log("Hello ALPSENSE!");\n}');

  return (
    <div className="coding-interface">
      <div className="editor-container">
        <div className="editor-header">
          <span>Code Editor</span>
          <div className="editor-controls">
            <button className="control-btn run">Run</button>
            <button className="control-btn clear">Clear</button>
            <button className="control-btn save">Save</button>
          </div>
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
        />
      </div>
      
      <OutputScreen />
    </div>
  );
};

export default CodingInterface;