import React from 'react';

const OutputScreen = () => {
  return (
    <div className="output-screen">
      <div className="output-header">
        <span>Output</span>
      </div>
      <div className="output-content">
        <div className="circular-display">
          <div className="circular-inner">
            <div className="circular-text">ALPSENSE</div>
            <div className="circular-status">Ready</div>
          </div>
        </div>
        <div className="output-console">
          <div className="console-header">Console Output</div>
          <div className="console-content">
            <div className="console-line">System initialized...</div>
            <div className="console-line">ALPSENSE platform ready</div>
            <div className="console-line">Waiting for code execution...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputScreen;