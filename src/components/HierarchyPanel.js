// src/components/HierarchyPanel.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectElement,
  moveElementUp,
  moveElementDown,
} from "../features/elements/elementsSlice";
import { FaArrowUp, FaArrowDown, FaEllipsisV } from "react-icons/fa";

const HierarchyPanel = () => {
  const elements = useSelector((state) => state.elements.elements);
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    dispatch(selectElement(id));
  };

  const handleMoveUp = (id) => {
    dispatch(moveElementUp(id));
  };

  const handleMoveDown = (id) => {
    dispatch(moveElementDown(id));
  };

  return (
    <div className="fixed top-16 left-0 h-[630px] bg-gray-900 text-white p-3 shadow-lg overflow-auto" style={{ width: "250px" }}>
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Hierarchy</h2>
      <ul className="space-y-1">
        {elements.map((element, index) => (
          <li
            key={element.id}
            className="flex justify-between items-center p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-150"
          >
            <div
              className="flex items-center cursor-pointer hover:text-blue-400"
              onClick={() => handleSelect(element.id)}
            >
              <span className="font-medium text-sm">{element.type}</span> - <span className="text-xs">{element.content}</span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleMoveUp(element.id)}
                className={`p-1 rounded ${
                  index === 0 ? "opacity-50 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={index === 0}
              >
                <FaArrowUp />
              </button>
              <button
                onClick={() => handleMoveDown(element.id)}
                className={`p-1 rounded ${
                  index === elements.length - 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={index === elements.length - 1}
              >
                <FaArrowDown />
              </button>
              <button
                className="p-1 rounded bg-gray-700 hover:bg-gray-600"
                onClick={() => {} /* Add functionality for more options */}
              >
                <FaEllipsisV className="text-white" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HierarchyPanel;