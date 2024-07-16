import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement } from '../features/elements/elementsSlice';
import { v4 as uuidv4 } from 'uuid';
import { exportProject } from '../utils/exportProject';
import { saveProject } from '../utils/storage';

const Toolbar = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);

  const elementDefaults = {
    text: {
      content: 'Text',
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      fontSize: '1.25',
      color: '#000',
    },
    image: {
      content: 'Image',
      x: 20,
      y: 20,
      width: 100,
      height: 40,
      src: 'https://via.placeholder.com/300',
    },
    field: {
      content: 'Field',
      x: 30,
      y: 30,
      width: 100,
      height: 40,
      placeholder: 'Enter text',
    },
    button: {
      content: 'Button',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      backgroundColor: '#007bff',
      color: '#fff',
    },
    container: {
      content: 'Container',
      x: 50,
      y: 50,
      width: 200,
      height: 200,
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

  return (
    <div className="navbar p-4 bg-gray-200 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex space-x-2">
        {Object.keys(elementDefaults).map((type) => (
          <button key={type} onClick={() => addNewElement(type)} className="btn">
            Add {elementDefaults[type].content}
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        <button onClick={handleExport} className="btn">
          Export
        </button>
        <button onClick={handleSave} className="btn">
          Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
