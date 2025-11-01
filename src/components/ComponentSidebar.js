import React, { useState } from 'react';
import '../styles/ComponentSidebar.css';

const ComponentSidebar = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  
  const components = [
    { name: 'LABEL'},
    { name: 'LABEL+'},
    { name: 'BUTTON'},
    { name: 'LINE'},
    { name: 'SWITCH'},
    { name: 'SLIDER'},
    { name: 'BAR'},
    { name: 'CHECKBOX'},
    { name: 'IMAGE'},
    { name: 'IMAGE+' }
  ];

  return (
    <div className="component-sidebar">
      <div className="component-sidebar-container">
        {components.map((component, index) => (
          <div 
            key={index} 
            className={`component-sidebar-item ${selectedComponent === component.name ? 'active' : ''}`}
            onClick={() => setSelectedComponent(
              selectedComponent === component.name ? null : component.name
            )}
          >
            <span className="component-icon">{component.icon}</span>
            <span className="component-name">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentSidebar;