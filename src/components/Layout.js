import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import ComponentSidebar from './ComponentSidebar';
import CodingInterface from './CodingInterface';

const Layout = ({ isPythonMode, onExecuteCode, output, isLoading }) => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="coding-area">
          <CodingInterface 
            isPythonMode={isPythonMode}
            onExecuteCode={onExecuteCode}
            output={output}
            isLoading={isLoading}
          />
        </div>
        <ComponentSidebar />
      </div>
    </div>
  );
};

export default Layout;