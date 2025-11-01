import React from 'react';
import '../styles/SidePanel.css';

const SidePanel = ({ activeNavItem, setActiveNavItem }) => {
  const hardwareComponents = [
    'Speaker', 'RGB LED', 'Power', 'Touch Sensor', 'Vibration Motor'
  ];

  const uiComponents = [
    'Screen Layout', 'Display Settings', 'Theme Options', 'Widgets'
  ];

  const renderPanelContent = () => {
    switch (activeNavItem) {
      case 'HARDWARE':
        return (
          <div className="panel-section">
            <h3>Hardware Components</h3>
            {hardwareComponents.map((component, index) => (
              <div key={index} className="panel-item">
                {component}
              </div>
            ))}
          </div>
        );
      case 'UI':
        return (
          <div className="panel-section">
            <h3>UI Components</h3>
            {uiComponents.map((component, index) => (
              <div key={index} className="panel-item">
                {component}
              </div>
            ))}
          </div>
        );
      case 'EVENT':
        return (
          <div className="panel-section">
            <h3>Event Handlers</h3>
            <div className="panel-item">On Click</div>
            <div className="panel-item">On Load</div>
            <div className="panel-item">Timer Events</div>
          </div>
        );
      case 'MODULES':
        return (
          <div className="panel-section">
            <h3>Available Modules</h3>
            <div className="panel-item">Math</div>
            <div className="panel-item">String</div>
            <div className="panel-item">Network</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`side-panel ${activeNavItem ? 'active' : ''}`}>
      <div className="panel-header">
        <span>{activeNavItem} Options</span>
        <button 
          className="panel-close"
          onClick={() => setActiveNavItem(null)}
        >
          ×
        </button>
      </div>
      <div className="panel-content">
        {renderPanelContent()}
      </div>
    </div>
  );
};

export default SidePanel;