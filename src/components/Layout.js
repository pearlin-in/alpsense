import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import ComponentSidebar from './ComponentSidebar';
import CodingInterface from './CodingInterface';

const Layout = ({ isPythonMode, onExecuteCode, output, isLoading,
  navActiveItem, setNavActiveItem, selectedNavOption, setSelectedNavOption,
  blocks, setBlocks
}) => {
  return (
    <div className="layout">
      <Header />
      <Navbar 
        activeNavItem={navActiveItem} 
        setActiveNavItem={setNavActiveItem}
        selectedNavOption={selectedNavOption}
        setSelectedNavOption={setSelectedNavOption}
        blocks={blocks}
        setBlocks={setBlocks}
      />
      <div className="main-content">
        <div className="coding-area">
          <CodingInterface 
            isPythonMode={isPythonMode}
            onExecuteCode={onExecuteCode}
            output={output}
            isLoading={isLoading}
            navActiveItem={navActiveItem}
            selectedNavOption={selectedNavOption}
            blocks={blocks}
            setBlocks={setBlocks}
          />
        </div>

        <ComponentSidebar />
      </div>
    </div>
  );
};

export default Layout;