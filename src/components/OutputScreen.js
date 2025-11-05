import React from 'react';
import '../styles/OutputScreen.css';

const OutputScreen = ({ output, isLoading }) => {
  return (
    <div className="output-screen">
      <div className="output-header">
        <span>Output</span>
      </div>
      <div className="output-content">
        <div className="circular-display">
          <div className="circular-inner">
            <div className="circular-text">ALPSENSE</div>
            <div className="circular-status">
              {isLoading ? 'Executing...' : output ? 'Output Ready' : 'Ready'}
            </div>
            {output && !isLoading && (
              <div className="output-preview">
                <div className="output-preview-text">
                  {output.split('\n')[0].substring(0, 15)}
                  {output.split('\n')[0].length > 15 ? '...' : ''}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="output-console">
          <div className="console-header">Console Output</div>
          <div className="console-content">
            {isLoading ? (
              <div className="loading">
                <div className="spinner"></div>
                Executing Python code...
              </div>
            ) : output ? (
              <pre>{output}</pre>
            ) : (
              <div className="console-placeholder">
                <div className="placeholder-line">System initialized...</div>
                <div className="placeholder-line">ALPSENSE platform ready</div>
                <div className="placeholder-line">Waiting for code execution...</div>
                <div className="placeholder-line">Type Python code and click Run</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;