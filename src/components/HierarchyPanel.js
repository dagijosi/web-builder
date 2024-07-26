// src/components/HierarchyPanel.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectElement,
  moveElementUp,
  moveElementDown,
  deleteElement,
  setParentElement,
  reorderElements,
  groupElements,
  ungroupElements,
  renameElement,
} from "../features/elements/elementsSlice";
import {
  FiChevronDown,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
  FiTrash2,
  FiLayers,
  FiEdit3,
} from "react-icons/fi";
import ConfirmationDialog from "./ConfirmationDialog";

const HierarchyPanel = () => {
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector(
    (state) => state.elements.selectedElementId
  );
  const dispatch = useDispatch();
  const [expandedElements, setExpandedElements] = useState([]);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    elementId: null,
  });
  const [draggedElement, setDraggedElement] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [renamingElementId, setRenamingElementId] = useState(null); // New state for renaming
  const [newName, setNewName] = useState(""); // New state for renaming input

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

  const handleDragStart = (element) => {
    setDraggedElement(element);
  };

  const handleDragOver = (e, overElement) => {
    e.preventDefault();
    if (draggedElement && draggedElement.id !== overElement.id) {
      const reorderedElements = elements.filter(
        (el) => el.id !== draggedElement.id
      );
      const overElementIndex = reorderedElements.findIndex(
        (el) => el.id === overElement.id
      );
      reorderedElements.splice(overElementIndex + 1, 0, draggedElement);
      dispatch(reorderElements(reorderedElements));
    }
  };

  const handleDragStop = (e, element) => {
    const targetElement = elements.find(
      (el) =>
        el.id !== element.id &&
        el.x <= e.clientX &&
        e.clientX <= el.x + el.width &&
        el.y <= e.clientY &&
        e.clientY <= el.y + el.height
    );
    if (targetElement) {
      dispatch(
        setParentElement({ childId: element.id, parentId: targetElement.id })
      );
    }
    setDraggedElement(null);
  };

  const filterElements = (elements) => {
    return elements.filter((element) => {
      const children = elements.filter((el) => el.parentId === element.id);
      return (
        element.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        children.some((child) => filterElements([child]).length > 0)
      );
    });
  };

  const handleRename = (id) => {
    setRenamingElementId(id);
    const element = elements.find((el) => el.id === id);
    setNewName(element.content);
  };

  const handleRenameSubmit = (id) => {
    dispatch(renameElement({ id, newName }));
    setRenamingElementId(null);
  };

  const filteredElements = filterElements(elements);
  const rootElements = filteredElements.filter((el) => !el.parentId);

  const renderElementHierarchy = (element, level = 0) => {
    const children = elements.filter((el) => el.parentId === element.id);
    const isExpanded = expandedElements.includes(element.id);
    const elementIndex = elements.findIndex((el) => el.id === element.id);

    const canMoveUp = elementIndex > 0;
    const canMoveDown = elementIndex < elements.length - 1;

    const indentLevel = level * 4; // Multiply level by the desired indent size

    return (
      <div key={element.id} onDragOver={(e) => handleDragOver(e, element)}>
        <div
          draggable
          onDragStart={() => handleDragStart(element)}
          onDragEnd={(e) => handleDragStop(e, element)}
          onClick={() => dispatch(selectElement(element.id))}
          className={`cursor-pointer flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
            element.id === selectedElementId ? "bg-blue-300" : ""
          } ${
            level === 1
              ? "ml-2"
              : level === 2
              ? "ml-8"
              : level === 3
              ? "ml-12"
              : level === 4
              ? "ml-16"
              : level === 5
              ? "ml-20"
              : level === 6
              ? "ml-24"
              : level === 7
              ? "ml-28"
              : level === 8
              ? "ml-32"
              : ""
          }`}
          role="treeitem"
          aria-expanded={isExpanded}
          aria-selected={element.id === selectedElementId}
          tabIndex={0}
        >
          {children.length > 0 && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(element.id);
              }}
              className="mr-2"
              aria-hidden="true"
            >
              {isExpanded ? (
                <FiChevronDown className="text-gray-500" />
              ) : (
                <FiChevronRight className="text-gray-500" />
              )}
            </div>
          )}
          <div className="flex-grow truncate">
            {renamingElementId === element.id ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => handleRenameSubmit(element.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSubmit(element.id);
                }}
                autoFocus
                className="border-b border-gray-400 focus:outline-none"
              />
            ) : (
              <span>
                {element.type} -{" "}
                <span className="text-sm text-gray-600">{element.content}</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <FiArrowUp
              onClick={(e) => {
                e.stopPropagation();
                canMoveUp && handleMoveUp(element.id);
              }}
              className={`cursor-pointer ${
                !canMoveUp && "text-gray-400 cursor-not-allowed"
              } transition-colors duration-150`}
              aria-hidden="true"
            />
            <FiArrowDown
              onClick={(e) => {
                e.stopPropagation();
                canMoveDown && handleMoveDown(element.id);
              }}
              className={`cursor-pointer ${
                !canMoveDown && "text-gray-400 cursor-not-allowed"
              } transition-colors duration-150`}
              aria-hidden="true"
            />
            <FiEdit3
              onClick={(e) => {
                e.stopPropagation();
                handleRename(element.id);
              }}
              className="cursor-pointer text-blue-500 transition-colors duration-150"
              aria-hidden="true"
            />
            <FiTrash2
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(element.id);
              }}
              className="cursor-pointer text-red-500 transition-colors duration-150"
              aria-hidden="true"
            />
            <FiLayers
              onClick={(e) => {
                e.stopPropagation();
                // Group or ungroup logic based on current state
                if (element.type === "group") {
                  dispatch(ungroupElements(element.id));
                } else {
                  dispatch(groupElements({ groupId: element.id, elementIds: children.map(child => child.id) }));
                }
              }}
              className="cursor-pointer text-green-500 transition-colors duration-150"
              aria-hidden="true"
            />
          </div>
        </div>
        {isExpanded &&
          children.map((child) => renderElementHierarchy(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="hierarchy-panel bg-white shadow-lg rounded-lg p-4 w-64 fixed top-0 left-0 h-[calc(100vh-4rem)] overflow-y-auto mt-16 z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hierarchy</h2>
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle Panel"
          onClick={() => {
            // Implement collapse/expand functionality
          }}
        >
          {/* Icon for collapsing/expanding the panel */}
        </button>
      </div>
      <input
        type="text"
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:border-blue-300"
        placeholder="Search elements..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search elements"
      />
      {rootElements.map((element) => renderElementHierarchy(element))}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={() =>
          setConfirmationDialog({ isOpen: false, elementId: null })
        }
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this element?"
      />
    </div>
  );
};

export default HierarchyPanel;