import React, { useState } from 'react';
import '../styles/CodingInterface.css';

// Simple block canvas to accept dropped palette blocks
const BlockInterface = ({ isPythonMode, activeBlock }) => {
  const [blocks, setBlocks] = useState([]);

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (!data) return;
      const blockMeta = JSON.parse(data);
      const newBlock = { id: Date.now(), ...blockMeta };
      setBlocks((prev) => [...prev, newBlock]);
    } catch (err) {
      console.error('Failed to parse dropped block', err);
    }
  };

  const removeBlock = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="block-interface">
      <div className="editor-container">
        <div className="editor-header">
          <span>
            {isPythonMode ? 'Python Block Editor' : 'Block Editor'}
            {activeBlock && ` - ${activeBlock}`}
          </span>
          <div className="editor-controls">
            <button className="control-btn execute">Execute</button>
            <button className="control-btn reset" onClick={() => setBlocks([])}>Clear</button>
          </div>
        </div>

        <div className="block-canvas" onDragOver={onDragOver} onDrop={onDrop}>
          {blocks.length === 0 && (
            <div className="canvas-empty">Drag blocks here from the side panel</div>
          )}

          {blocks.map((b) => (
            <div key={b.id} className="block-node">
              <div className="block-label">{b.label || b.type}</div>
              <button className="block-remove" onClick={() => removeBlock(b.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
      <div className="block-preview" />
    </div>
  );
};

export default BlockInterface;
