import React from 'react';
import '../styles/BlocksPalette.css';

// Simple palette that lists draggable block types for a given category/item
const BlocksPalette = ({ category, item, onAddBlock }) => {
  // Define blocks for certain items
  const paletteMap = {
    HARDWARE: {
      Speaker: [
        { type: 'SPEAKER_PLAY', label: 'Play Sound',code:"playsound('sound.mp3')" },
        { type: 'SPEAKER_STOP', label: 'Stop Sound' },
        { type: 'SPEAKER_SET_VOLUME', label: 'Set Volume' }
      ],
      'RGB LED': [
        { type: 'RGB_SET_COLOR', label: 'Set Color' },
        { type: 'RGB_BLINK', label: 'Blink' }
      ],
      Power: [
        { type: 'POWER_ON', label: 'Power On' },
        { type: 'POWER_OFF', label: 'Power Off' }
      ]
    },
    UI: {
      'Screen Layout': [
        { type: 'UI_SHOW', label: 'Show Element' },
        { type: 'UI_HIDE', label: 'Hide Element' }
      ]
    }
  };

  const blocks = (paletteMap[category] && paletteMap[category][item]) || [];

  const onDragStart = (e, block) => {
    // Transfer block metadata as JSON string
    e.dataTransfer.setData('text/plain', JSON.stringify(block));
    // Set drag effect and add dragging class
    e.dataTransfer.effectAllowed = 'copy';
    e.target.classList.add('dragging');
  };

  const onDragEnd = (e) => {
    // Remove dragging class when drag ends
    e.target.classList.remove('dragging');
  };

  return (
    <div className="blocks-palette">
      <h4>{item} Blocks</h4>
      <div className="palette-list">
        {blocks.length === 0 && <div className="palette-empty">No blocks available</div>}
        {blocks.map((b) => (
          <div
            key={b.type}
            className="palette-block"
            draggable
            onDragStart={(e) => onDragStart(e, b)}
            onDragEnd={onDragEnd}
            onClick={() => onAddBlock && onAddBlock(b)}
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlocksPalette;
