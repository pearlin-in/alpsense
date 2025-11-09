import React, { useState, useRef, useEffect } from 'react';
import '../styles/Terminal.css';

const Terminal = ({ onExecuteCommand, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    '🐍 ALPSENSE Python Terminal',
    'Type Python commands directly or use:',
    '  - "clear" to clear terminal',
    '  - "help" for available commands',
    '----------------------------------------',
    '>>> '
  ]);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add command to history
      const newHistory = [...history, `>>> ${input}`];
      setHistory(newHistory);
      
      // Execute command
      onExecuteCommand(input);
      
      // Clear input
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const clearTerminal = () => {
    setHistory([
      '🐍 ALPSENSE Python Terminal - Cleared',
      '----------------------------------------',
      '>>> '
    ]);
  };

  return (
    <div className="terminal-overlay">
      <div className="terminal-container">
        <div className="terminal-header">
          <span>💻 Python Terminal</span>
          <div className="terminal-controls">
            <button className="terminal-btn clear" onClick={clearTerminal}>
              🗑️ Clear
            </button>
            <button className="terminal-close" onClick={onClose}>
              ×
            </button>
          </div>
        </div>
        
        <div className="terminal-content">
          <div className="terminal-output">
            {history.map((line, index) => (
              <div key={index} className="terminal-line">
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="terminal-input-form">
            <span className="prompt">{'>>>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="terminal-input"
              placeholder="Enter Python code..."
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;