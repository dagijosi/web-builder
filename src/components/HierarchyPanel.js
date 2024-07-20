// src/components/HierarchyPanel.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectElement, moveElementUp, moveElementDown, deleteElement } from "../features/elements/elementsSlice";
import { FiChevronDown, FiChevronRight, FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";
import ConfirmationDialog from './ConfirmationDialog';

const HierarchyPanel = () => {
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector((state) => state.elements.selectedElementId);
  const dispatch = useDispatch();
  const [expandedElements, setExpandedElements] = useState([]);
  const [confirmationDialog, setConfirmationDialog] = useState({ isOpen: false, elementId: null });

  const toggleExpand = (id) => {
    setExpandedElements((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  const handleMoveUp = (id) => {
    dispatch(moveElementUp(id));
  };

  const handleMoveDown = (id) => {
    dispatch(moveElementDown(id));
  };

  const handleDelete = (id) => {
    setConfirmationDialog({ isOpen: true, elementId: id });
  };

  const confirmDelete = () => {
    dispatch(deleteElement(confirmationDialog.elementId));
    setConfirmationDialog({ isOpen: false, elementId: null });
  };

  const renderElementHierarchy = (element, level = 0) => {
    const children = elements.filter(el => el.parentId === element.id);
    const isExpanded = expandedElements.includes(element.id);
    const elementIndex = elements.findIndex(el => el.id === element.id);

    const canMoveUp = elementIndex > 0;
    const canMoveDown = elementIndex < elements.length - 1;

    return (
      <div key={element.id} className={`ml-${level * 4}`}>
        <div
          onClick={() => dispatch(selectElement(element.id))}
          className={`cursor-pointer flex items-center p-2 rounded hover:bg-gray-300 ${element.id === selectedElementId ? 'bg-blue-100' : ''}`}
        >
          {children.length > 0 && (
            <div onClick={(e) => { e.stopPropagation(); toggleExpand(element.id); }} className="mr-2">
              {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
            </div>
          )}
          <div className="flex-grow">{element.type} - <span className="text-xs">{element.content}</span></div>
          <div className="flex items-center space-x-2">
            <FiArrowUp
              onClick={(e) => { e.stopPropagation(); canMoveUp && handleMoveUp(element.id); }}
              className={`cursor-pointer ${!canMoveUp && 'text-gray-400 cursor-not-allowed'}`}
            />
            <FiArrowDown
              onClick={(e) => { e.stopPropagation(); canMoveDown && handleMoveDown(element.id); }}
              className={`cursor-pointer ${!canMoveDown && 'text-gray-400 cursor-not-allowed'}`}
            />
            <FiTrash2
              onClick={(e) => { e.stopPropagation(); handleDelete(element.id); }}
              className="cursor-pointer text-red-500"
            />
          </div>
        </div>
        {isExpanded && children.map(child => renderElementHierarchy(child, level + 1))}
      </div>
    );
  };

  const rootElements = elements.filter(el => !el.parentId);

  return (
    <div className="hierarchy-panel bg-white shadow-md p-4 w-64 fixed top-0 left-0 h-[630px] overflow-y-auto mt-16 z-10">
      <h2 className="text-xl font-bold mb-4">Hierarchy</h2>
      {rootElements.map(element => renderElementHierarchy(element))}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={() => setConfirmationDialog({ isOpen: false, elementId: null })}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this element?"
      />
    </div>
  );
};

export default HierarchyPanel;
