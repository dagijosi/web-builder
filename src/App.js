// src/App.js
import React from 'react';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import HierarchyPanel from './components/HierarchyPanel';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar as the top navigation */}
      <Toolbar />

      <div className="flex flex-1">
        {/* HierarchyPanel as the left navigation */}
        <HierarchyPanel className="w-1/5 bg-gray-200 border-r border-gray-300" />

        {/* Canvas centered in the middle */}
        <Canvas className="flex-1 bg-white" />

        {/* PropertiesPanel as the right navigation */}
        <PropertiesPanel className="w-1/4 bg-gray-200 border-l border-gray-300" />
      </div>
    </div>
  );
};

export default App;
