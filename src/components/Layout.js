import React from 'react';
import Navbar from './Navbar';
import ComponentSidebar from './ComponentSidebar';
import CodingInterface from './CodingInterface';

const Layout = ({ isPythonMode, onExecuteCode, output, isLoading, isBackendConnected }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">
        <div className="coding-area">
          <CodingInterface 
            isPythonMode={isPythonMode}
            onExecuteCode={onExecuteCode}
            output={output}
            isLoading={isLoading}
            isBackendConnected={isBackendConnected}
          />
        </div>
        <ComponentSidebar />
      </div>
    </div>
  );
};

export default Layout;