import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteElement,
  updateElement,
} from "../features/elements/elementsSlice";
import PropertyInput from "./PropertyInput";
import {
  AiOutlineDelete,
  AiOutlineClose,
  AiOutlineSetting,
  AiOutlineExpandAlt,
} from "react-icons/ai";
import { renderCommonProperties } from "./RenderProperties/renderCommonProperties";
import { renderGroupProperties } from "./RenderProperties/renderGroupProperties";
import { renderContainerProperties } from "./RenderProperties/renderContainerProperties";
import { renderFieldProperties } from "./RenderProperties/renderFieldProperties";
import { renderButtonProperties } from "./RenderProperties/renderButtonProperties";
import { renderTextProperties } from "./RenderProperties/renderTextProperties";
import { renderImageProperties } from "./RenderProperties/renderImageProperties";

const PropertiesPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [visibility, setVisibility] = useState({
    padding: false,
    margin: false,
    border: false,
    background: false,
    text: false,
    font: false,
    behavior: false,
    states: false,
    styling: false,
    general: false,
    stylingProperties: false,
    effects: false,
    overflow: false,
    flexWrap: false,
    card: false
  });
  const selectedElement = useSelector((state) =>
    state.elements.elements.find(
      (el) => el.id === state.elements.selectedElementId
    )
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(
          updateElement({
            id: selectedElement.id,
            properties: { [name]: event.target.result },
          })
        );
      };
      reader.readAsDataURL(files[0]);
    } else {
      dispatch(
        updateElement({ id: selectedElement.id, properties: { [name]: value } })
      );
    }
  };

  const handleDelete = () => {
    if (selectedElement) {
      dispatch(deleteElement(selectedElement.id));
    }
  };

  const toggleVisibility = (section) => {
    setVisibility((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!selectedElement) return null;

  return (
    <div
      className={`${
        isOpen
          ? "properties-panel fixed top-16 right-0 bg-white shadow-lg transition-transform translate-x-0 h-[650px] p-4 rounded-lg overflow-y-auto"
          : "w-fit fixed top-3 right-3 z-10 h-fit"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center bg-blue-500 text-white rounded-full p-2 mb-4 hover:bg-blue-600 focus:outline-none"
      >
        {isOpen ? <AiOutlineClose size={14} /> : <AiOutlineSetting size={14} />}
      </button>
      {isOpen && (
        <div className="space-y-2">
          <PropertyInput
            label="Content"
            name="content"
            value={selectedElement.content || ""}
            onChange={handleChange}
          />
          {renderCommonProperties(
            selectedElement,
            handleChange,
            visibility.padding,
            () => toggleVisibility("padding"),
            visibility.margin,
            () => toggleVisibility("margin"),
            visibility.border,
            () => toggleVisibility("border"),
            visibility.background,
            () => toggleVisibility("background")
          )}
          {selectedElement.type === "text" &&
            renderTextProperties(
              selectedElement,
              handleChange,
              visibility.text,
              () => toggleVisibility("text"),
              visibility.font,
              () => toggleVisibility("font"),
              visibility.flexWrap,
              () => toggleVisibility("flexWrap")
            )}
          {selectedElement.type === "button" &&
            renderButtonProperties(
              selectedElement,
              handleChange,
              visibility.text,
              () => toggleVisibility("text"),
              visibility.font,
              () => toggleVisibility("font"),
              visibility.behavior,
              () => toggleVisibility("behavior"),
              visibility.states,
              () => toggleVisibility("states")
            )}
          {selectedElement.type === "image" &&
            renderImageProperties(
              selectedElement,
              handleChange,
              visibility.general,
              () => toggleVisibility("general"),
              visibility.stylingProperties,
              () => toggleVisibility("stylingProperties"),
              visibility.effects,
              () => toggleVisibility("effects")
            )}
          {selectedElement.type === "field" &&
            renderFieldProperties(
              selectedElement,
              handleChange,
              visibility.styling,
              () => toggleVisibility("styling"),
              visibility.text,
              () => toggleVisibility("text"),
              visibility.font,
              () => toggleVisibility("font")
            )}
          {selectedElement.type === "container" &&
            renderContainerProperties(
              selectedElement,
              handleChange,
              visibility.overflow,
              () => toggleVisibility("overflow"),
              visibility.flexWrap,
              () => toggleVisibility("flexWrap")
            )}
          {selectedElement.type === "group" &&
            renderGroupProperties(selectedElement, handleChange,
              visibility.card,
              () => toggleVisibility("card"),
              visibility.flexWrap,
              () => toggleVisibility("flexWrap"),
            )}
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white rounded px-4 py-1.5 hover:bg-red-600 focus:outline-none text-sm"
          >
            Delete Element
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
