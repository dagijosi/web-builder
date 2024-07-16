// src/App.js
import React from 'react';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import HierarchyPanel from './components/HierarchyPanel';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <div className="app">
      <Toolbar />
      <div className="main-content">
        <HierarchyPanel />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default App;
