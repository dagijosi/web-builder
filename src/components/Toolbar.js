import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, loadProject, undo, redo, groupElements } from '../features/elements/elementsSlice';
import { v4 as uuidv4 } from 'uuid';
import { exportProject } from '../utils/exportProject';
import { saveProject, loadProjectFromStorage } from '../utils/storage';
import { FiDownload, FiSave, FiUpload, FiArrowLeft, FiArrowRight, FiLayers } from 'react-icons/fi';

const Toolbar = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector((state) => state.elements.selectedElementId);

  const elementDefaults = {
    text: {
      content: 'Text',
      text: "Text",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      fontSize: '1.25rem',
      color: '#000',
    },
    image: {
      content: 'Image',
      text: "Image",
      x: 20,
      y: 20,
      width: 100,
      height: 40,
      src: 'https://via.placeholder.com/300',
    },
    field: {
      content: 'Field',
      text: "Field",
      x: 30,
      y: 30,
      width: 100,
      height: 40,
      placeholder: 'Enter text',
    },
    button: {
      content: 'Button',
      text: "Button",
      textAlign: 'center',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      backgroundColor: '#007bff',
      color: '#fff',
    },
    container: {
      text: "Container",
      x: 0,
      y: 0,
      width: 1366,
      height: 768,
      backgroundColor: '#f0f0f0',
    },
  };

  const addNewElement = (type) => {
    const newElement = {
      id: uuidv4(),
      type,
      ...elementDefaults[type],
    };
    dispatch(addElement(newElement));
  };

  const handleExport = async () => {
    try {
      await exportProject(elements);
      alert('Project exported successfully!');
    } catch (error) {
      console.error('Export Error:', error);
      alert('Failed to export project: ' + error.message);
    }
  };

  const handleSave = async () => {
    try {
      await saveProject(elements);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Save Error:', error);
      alert('Failed to save project: ' + error.message);
    }
  };

  const handleLoad = async () => {
    try {
      const loadedElements = await loadProjectFromStorage();
      dispatch(loadProject(loadedElements));
      alert('Project loaded successfully!');
    } catch (error) {
      console.error('Load Error:', error);
      alert('Failed to load project: ' + error.message);
    }
  };

  const handleGroupElements = () => {
    const groupId = uuidv4();
    const selectedElements = elements.filter(el => el.id === selectedElementId);
    const elementIds = selectedElements.map(el => el.id);
    dispatch(groupElements({ groupId, elementIds }));
  };

  return (
    <div className="navbar bg-white shadow p-2 px-12 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex space-x-2">
        {Object.keys(elementDefaults).map((type) => (
          <button
            key={type}
            onClick={() => addNewElement(type)}
            className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          >
            {elementDefaults[type].text}
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleExport}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Export Project"
        >
          <FiDownload className="inline-block mr-1" /> Export
        </button>
        <button
          onClick={handleSave}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Save Project"
        >
          <FiSave className="inline-block mr-1" /> Save
        </button>
        <button
          onClick={handleLoad}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Load Project"
        >
          <FiUpload className="inline-block mr-1" /> Load
        </button>
        <button
          onClick={() => dispatch(undo())}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Undo"
        >
          <FiArrowLeft className="inline-block mr-1" /> Undo
        </button>
        <button
          onClick={() => dispatch(redo())}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Redo"
        >
          <FiArrowRight className="inline-block mr-1" /> Redo
        </button>
        <button
          onClick={handleGroupElements}
          className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
          aria-label="Group Selected Elements"
        >
          <FiLayers className="inline-block mr-1" /> Group
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
