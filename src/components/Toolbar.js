// src/components/Toolbar.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  loadProject,
  undo,
  redo,
  groupElements,
  ungroupElements,
} from "../features/elements/elementsSlice";
import { v4 as uuidv4 } from "uuid";
import {
  saveProjectToFile,
  loadProjectFromFile,
} from "../utils/fileHandlers";
import { exportHTMLProject, exportProject } from "../utils/exportProject";
import { exportReactProject } from "../utils/exportReactProject";
import { exportReactProjectWithTailwind } from "../utils/exportProjectToReactWithTailwind";
import { exportReactProjectWithStyledComponents } from "../utils/exportProjectToStyledComponents";
import {
  FiDownload,
  FiUpload,
  FiArrowLeft,
  FiArrowRight,
  FiLayers,
} from "react-icons/fi";
import ExportDropdown from "./ExportDropdown";
import Modal from "./Modal";

const Toolbar = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector(
    (state) => state.elements.selectedElementId
  );
  const [previewCode, setPreviewCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState("html");

  const elementDefaults = {
    text: {
      content: "Text",
      text: "Text",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      fontSize: "1.25rem",
      color: "#000",
    },
    image: {
      content: "Image",
      text: "Image",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      src: "https://via.placeholder.com/300",
    },
    field: {
      content: "Field",
      text: "Field",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      placeholder: "Enter text",
    },
    button: {
      content: "Button",
      text: "Button",
      textAlign: "center",
      x: 0,
      y: 0,
      width: 100,
      height: 40,
      backgroundColor: "#007bff",
      borderColor: "#ffffff",
      color: "#fff",
    },
    container: {
      text: "Container",
      x: 0,
      y: 0,
      width: 1366,
      height: 768,
      backgroundColor: "#f0f0f0",
    },
    group: {
      text: "Group",
      x: 0,
      y: 0,
      width: 1366,
      height: 150,
      backgroundColor: "#ffffff",
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

  const handleExportHTML = () => {
    try {
      const code = exportProject(elements);
      setPreviewCode(code);
      setIsModalOpen(true);
      setLanguage("html");
    } catch (error) {
      console.error("Export Error:", error);
      alert("Failed to export project as HTML: " + error.message);
    }
  };

  const handleExportReact = () => {
    try {
      const code = exportReactProject(elements);
      setPreviewCode(code);
      setIsModalOpen(true);
      setLanguage("jsx");
    } catch (error) {
      console.error("Export Error:", error);
      alert("Failed to export project as React: " + error.message);
    }
  };

  const handleExportReactTailwind = () => {
    try {
      const code = exportReactProjectWithTailwind(elements);
      setPreviewCode(code);
      setIsModalOpen(true);
      setLanguage("jsx");
    } catch (error) {
      console.error("Export Error:", error);
      alert("Failed to export project as React Tailwind: " + error.message);
    }
  };

  const handleExportStyledComponents = () => {
    try {
      const code = exportReactProjectWithStyledComponents(elements, true);
      setPreviewCode(code);
      setIsModalOpen(true);
      setLanguage("jsx");
    } catch (error) {
      console.error("Export Error:", error);
      alert(
        "Failed to export project as Styled Components: " + error.message
      );
    }
  };

  const handleFileSave = async () => {
    try {
      await saveProjectToFile(elements);
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save project: " + error.message);
    }
  };

  const handleFileLoad = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const loadedElements = await loadProjectFromFile(file);
        dispatch(loadProject(loadedElements));
        alert("Project loaded successfully!");
      }
    } catch (error) {
      console.error("Load Error:", error);
      alert("Failed to load project: " + error.message);
    }
  };

  const handleGroupElements = () => {
    const groupId = uuidv4();
    const selectedElements = elements.filter(
      (el) => el.id === selectedElementId
    );
    const elementIds = selectedElements.map((el) => el.id);
    dispatch(groupElements({ groupId, elementIds }));
  };

  const handleUngroupElements = () => {
    if (selectedElementId) {
      dispatch(ungroupElements(selectedElementId));
    }
  };

  const handleDownload = (code, language) => {
    const blob = new Blob([code], {
      type:
        language === "javascript"
          ? "application/javascript"
          : language === "jsx"
          ? "text/jsx"
          : "text/html",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `project.${
      language === "javascript" ? "js" : language === "jsx" ? "jsx" : "html"
    }`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
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
          <ExportDropdown
            handleExportHTML={handleExportHTML}
            handleExportReact={handleExportReact}
            handleExportReactTailwind={handleExportReactTailwind}
            handleExportStyledComponents={handleExportStyledComponents}
          />
          <button
            onClick={handleFileSave}
            className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
            aria-label="Save Project"
          >
            <FiDownload className="inline-block mr-1" /> Save
          </button>
          <label
            className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs cursor-pointer"
            aria-label="Load Project"
          >
            <FiUpload className="inline-block mr-1" /> Load
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileLoad}
            />
          </label>
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
            aria-label="Group Elements"
          >
            <FiLayers className="inline-block mr-1" /> Group
          </button>
          <button
            onClick={handleUngroupElements}
            className="bg-gray-200 text-gray-800 font-semibold py-1.5 px-3 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs"
            aria-label="Ungroup Elements"
          >
            <FiLayers className="inline-block mr-1" /> Ungroup
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        code={previewCode}
        initialLanguage={language}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Toolbar;