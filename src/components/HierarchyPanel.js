// src/components/HierarchyPanel.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectElement } from '../features/elements/elementsSlice';

const HierarchyPanel = () => {
  const elements = useSelector(state => state.elements.elements);
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    dispatch(selectElement(id));
  };

  return (
    <div className="hierarchy-panel fixed top-16 left-0 h-full bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Hierarchy</h2>
      <ul>
        {elements.map(element => (
          <li key={element.id} onClick={() => handleSelect(element.id)} className="cursor-pointer">
            {element.type} - {element.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HierarchyPanel;
