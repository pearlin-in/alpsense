import React from 'react';
import '../styles/BlockEditor.css';

const BlockEditor = ({ blocks, setBlocks, onAddBlock }) => {
  const updateBlock = (index, field, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
    setBlocks(updatedBlocks);
  };

  const removeBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  const moveBlock = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === blocks.length - 1)) {
      return;
    }
    
    const updatedBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedBlocks[index], updatedBlocks[newIndex]] = 
    [updatedBlocks[newIndex], updatedBlocks[index]];
    setBlocks(updatedBlocks);
  };

  return (
    <div className="block-editor">
      <div className="blocks-container">
        {blocks.length === 0 ? (
          <div className="empty-state">
            <p>No blocks added yet.</p>
            <p>Click on components in the sidebar to add blocks!</p>
          </div>
        ) : (
          blocks.map((block, index) => (
            <div key={index} className={`block block-${block.type}`}>
              <div className="block-header">
                <span className="block-type">{block.type.toUpperCase()}</span>
                <div className="block-controls">
                  <button onClick={() => moveBlock(index, 'up')}>↑</button>
                  <button onClick={() => moveBlock(index, 'down')}>↓</button>
                  <button onClick={() => removeBlock(index)}>×</button>
                </div>
              </div>
              
              <div className="block-content">
                {block.type === 'print' && (
                  <input
                    type="text"
                    value={block.value}
                    onChange={(e) => updateBlock(index, 'value', e.target.value)}
                    placeholder="Text to print"
                  />
                )}
                
                {block.type === 'variable' && (
                  <div className="variable-inputs">
                    <input
                      type="text"
                      value={block.name}
                      onChange={(e) => updateBlock(index, 'name', e.target.value)}
                      placeholder="Variable name"
                    />
                    <span>=</span>
                    <input
                      type="text"
                      value={block.value}
                      onChange={(e) => updateBlock(index, 'value', e.target.value)}
                      placeholder="Value"
                    />
                  </div>
                )}
                
                {block.type === 'loop' && (
                  <div className="loop-inputs">
                    <span>for</span>
                    <input
                      type="text"
                      value={block.variable}
                      onChange={(e) => updateBlock(index, 'variable', e.target.value)}
                      placeholder="i"
                    />
                    <span>in range(</span>
                    <input
                      type="number"
                      value={block.start}
                      onChange={(e) => updateBlock(index, 'start', e.target.value)}
                      placeholder="0"
                    />
                    <span>,</span>
                    <input
                      type="number"
                      value={block.end}
                      onChange={(e) => updateBlock(index, 'end', e.target.value)}
                      placeholder="10"
                    />
                    <span>):</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlockEditor;