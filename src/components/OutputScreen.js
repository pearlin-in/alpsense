import React from 'react';
import '../styles/OutputScreen.css';

const OutputScreen = ({ output, isLoading, isBackendConnected, isWaitingForInput }) => {
  // Extract first line for the oval display
  const getOvalDisplay = () => {
    if (isLoading) return 'Executing...';
    if (!isBackendConnected) return 'Server Offline';
    if (isWaitingForInput) return 'Waiting for input...';
    if (!output) return 'Ready';
    
    const firstLine = output.split('\n')[0];
    // Shorten for display
    return firstLine.length > 20 ? firstLine.substring(0, 17) + '...' : firstLine;
  };

  // Check if output contains errors
  const hasError = output.includes('Error') || output.includes('❌') || !isBackendConnected;

  return (
    <div className="output-screen">
      <div className="output-header">
        <span>Output</span>
        <div className="status-indicator">
          <div className={`status-dot ${isBackendConnected ? 'connected' : 'disconnected'}`}></div>
          {isBackendConnected ? 'Connected' : 'Disconnected'}
          {isWaitingForInput && <span className="waiting-badge">Input Required</span>}
        </div>
      </div>
      <div className="output-content">
        <div className={`circular-display ${hasError ? 'error' : ''} ${isLoading ? 'loading' : ''} ${isWaitingForInput ? 'waiting' : ''}`}>
          <div className="circular-inner">
            <div className="circular-text">ALPSENSE</div>
            <div className="circular-status">
              {getOvalDisplay()}
            </div>
            {output && !isLoading && (
              <div className="output-preview">
                <div className="output-preview-text">
                  {getOvalDisplay()}
                </div>
              </div>
            )}
          </div>
          {isLoading && (
            <div className="execution-animation">
              <div className="pulse"></div>
            </div>
          )}
        </div>
        
        <div className="output-console">
          <div className="console-header">
            Console Output
            {output && (
              <div className="output-info">
                {output.split('\n').length} lines | {output.length} chars
              </div>
            )}
          </div>
          <div className="console-content">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                Executing Python code...
              </div>
            ) : output ? (
              <div className={`output-text ${hasError ? 'error' : 'success'}`}>
                <pre>{output}</pre>
              </div>
            ) : (
              <div className="console-placeholder">
                <div className="placeholder-line">🚀 ALPSENSE Python Editor</div>
                <div className="placeholder-line">Write Python code and click Run</div>
                <div className="placeholder-line">See results here and in the display above</div>
                <div className="placeholder-line">Try interactive input with: name = input("What's your name? ")</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;