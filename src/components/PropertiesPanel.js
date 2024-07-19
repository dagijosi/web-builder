import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteElement, updateElement } from "../features/elements/elementsSlice";
import PropertyInput from "./PropertyInput";
import DropdownInput from "./DropdownInput";
import { AiOutlineDelete, AiOutlineClose, AiOutlineSetting } from "react-icons/ai";

const renderCommonProperties = (selectedElement, handleChange) => (
  <>
    <PropertyInput
      label="Width"
      name="width"
      value={selectedElement.width}
      onChange={handleChange}
      type="number"
      unit="px"
    />
    <PropertyInput
      label="Height"
      name="height"
      value={selectedElement.height}
      onChange={handleChange}
      type="number"
      unit="px"
    />
    <PropertyInput
      label="X Position"
      name="x"
      value={selectedElement.x}
      onChange={handleChange}
      type="number"
      unit="px"
    />
    <PropertyInput
      label="Y Position"
      name="y"
      value={selectedElement.y}
      onChange={handleChange}
      type="number"
      unit="px"
    />
    <div className="space-y-1">
      {["Top", "Right", "Bottom", "Left"].map((pos) => (
        <PropertyInput
          key={pos}
          label={`Padding ${pos}`}
          name={`padding${pos}`}
          value={selectedElement[`padding${pos}`] || ""}
          onChange={handleChange}
          placeholder={pos}
          unit="rem"
        />
      ))}
    </div>
    <div className="space-y-1">
      {["Top", "Right", "Bottom", "Left"].map((pos) => (
        <PropertyInput
          key={pos}
          label={`Margin ${pos}`}
          name={`margin${pos}`}
          value={selectedElement[`margin${pos}`] || ""}
          onChange={handleChange}
          placeholder={pos}
          unit="rem"
        />
      ))}
    </div>
  </>
);

const renderTextProperties = (selectedElement, handleChange) => (
  <>
    <DropdownInput
      label="Text Align"
      name="textAlign"
      value={selectedElement.textAlign || ""}
      onChange={handleChange}
      displayOptions={["left", "center", "right"]}
    />
    <PropertyInput
      label="Font Size"
      name="fontSize"
      value={selectedElement.fontSize || ""}
      onChange={handleChange}
      type="number"
      unit="rem"
    />
    <PropertyInput
      label="Font Family"
      name="fontFamily"
      value={selectedElement.fontFamily || ""}
      onChange={handleChange}
    />
    <PropertyInput
      label="Text Color"
      name="textColor"
      value={selectedElement.textColor || ""}
      onChange={handleChange}
      type="color"
    />
    <PropertyInput
      label="Background Color"
      name="backgroundColor"
      value={selectedElement.backgroundColor || ""}
      onChange={handleChange}
      type="color"
    />
  </>
);

const renderButtonProperties = (selectedElement, handleChange) => (
  <>
    <DropdownInput
      label="Text Align"
      name="textAlign"
      value={selectedElement.textAlign || ""}
      onChange={handleChange}
      displayOptions={["left", "center", "right"]}
    />
    <PropertyInput
      label="Font Size"
      name="fontSize"
      value={selectedElement.fontSize || ""}
      onChange={handleChange}
      type="number"
      unit="rem"
    />
    <PropertyInput
      label="Font Family"
      name="fontFamily"
      value={selectedElement.fontFamily || ""}
      onChange={handleChange}
    />
    <PropertyInput
      label="Text Color"
      name="textColor"
      value={selectedElement.textColor || ""}
      onChange={handleChange}
      type="color"
    />
    <PropertyInput
      label="Background Color"
      name="backgroundColor"
      value={selectedElement.backgroundColor || ""}
      onChange={handleChange}
      type="color"
    />
    <PropertyInput
      label="Border Color"
      name="borderColor"
      value={selectedElement.borderColor || ""}
      onChange={handleChange}
      type="color"
    />
    <PropertyInput
      label="Border Width"
      name="borderWidth"
      value={selectedElement.borderWidth || ""}
      onChange={handleChange}
      type="number"
      unit="rem"
    />
    <PropertyInput
      label="Border Radius"
      name="borderRadius"
      value={selectedElement.borderRadius || ""}
      onChange={handleChange}
      type="number"
      unit="rem"
    />
    <DropdownInput
    label="Cursor"
    name="cursor"
    value={selectedElement.cursor || ""}
    onChange={handleChange}
    displayOptions={["auto", "default", "pointer", "move", "not-allowed"]}
    />
  </>
);

const renderImageProperties = (selectedElement, handleChange) => (
  <>
    <PropertyInput
      label="Image Source"
      name="imageSrc"
      value={selectedElement.imageSrc || ""}
      onChange={handleChange}
      type="file"
    />
    <DropdownInput
      label="Object Fit"
      name="objectFit"
      value={selectedElement.objectFit || ""}
      onChange={handleChange}
      displayOptions={["fill", "contain", "cover", "none", "scale-down"]}
    />
  </>
);

const renderFieldProperties = (selectedElement, handleChange) => (
  <>
    <PropertyInput
      label="Placeholder"
      name="placeholder"
      value={selectedElement.placeholder || ""}
      onChange={handleChange}
    />
    <PropertyInput
      label="Value"
      name="value"
      value={selectedElement.value || ""}
      onChange={handleChange}
    />
  </>
);

const renderContainerProperties = (selectedElement, handleChange) => (
  <>
    <PropertyInput
      label="Background Color"
      name="backgroundColor"
      value={selectedElement.backgroundColor || ""}
      onChange={handleChange}
      type="color"
    />
  </>
);
const renderGroupProperties = (selectedElement, handleChange) => (
  <>
    <PropertyInput
      label="Background Color"
      name="backgroundColor"
      value={selectedElement.backgroundColor || ""}
      onChange={handleChange}
      type="color"
    />
  </>
);

const PropertiesPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
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
            value={selectedElement.content}
            onChange={handleChange}
          />
          {renderCommonProperties(selectedElement, handleChange)}
          {selectedElement.type === "text" &&
            renderTextProperties(selectedElement, handleChange)}
          {selectedElement.type === "button" &&
            renderButtonProperties(selectedElement, handleChange)}
          {selectedElement.type === "image" &&
            renderImageProperties(selectedElement, handleChange)}
          {selectedElement.type === "field" &&
            renderFieldProperties(selectedElement, handleChange)}
          {selectedElement.type === "container" &&
            renderContainerProperties(selectedElement, handleChange)}
          {selectedElement.type === "group" &&
           renderGroupProperties(selectedElement, handleChange)}
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
