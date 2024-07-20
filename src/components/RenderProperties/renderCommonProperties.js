import React from "react";
import PropertyInput from "../PropertyInput";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";

export const renderCommonProperties = (
  selectedElement,
  handleChange,
  showPadding,
  setShowPadding,
  showMargin,
  setShowMargin,
  showBorder,
  setShowBorder,
  showBackground,
  setShowBackground
) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <PropertyInput
          label="Width"
          name="width"
          value={selectedElement.width || ""}
          onChange={handleChange}
          type="number"
          unit="px"
        />
      </div>
      <div>
        <PropertyInput
          label="Height"
          name="height"
          value={selectedElement.height || ""}
          onChange={handleChange}
          type="number"
          unit="px"
        />
      </div>
      <div>
        <PropertyInput
          label="X Position"
          name="x"
          value={selectedElement.x || ""}
          onChange={handleChange}
          type="number"
          unit="px"
        />
      </div>
      <div>
        <PropertyInput
          label="Y Position"
          name="y"
          value={selectedElement.y || ""}
          onChange={handleChange}
          type="number"
          unit="px"
        />
      </div>
    </div>
    <button
      onClick={() => setShowBackground(!showBackground)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>
        {showBackground ? (
          <FiChevronDown className="text-gray-500" />
        ) : (
          <FiChevronRight className="text-gray-500" />
        )}
      </span>
      <span className="text-xs font-semibold">Background</span>
    </button>
    {showBackground && (
      <div className="grid grid-cols-2 gap-2">
        <PropertyInput
          label="Background Color"
          name="backgroundColor"
          value={selectedElement.backgroundColor || ""}
          onChange={handleChange}
          type="color"
        />
        <PropertyInput
          label="Background Image"
          name="backgroundImage"
          value={selectedElement.backgroundImage || ""}
          onChange={handleChange}
          type="text"
          placeholder="URL"
        />
        <DropdownInput
          label="Background Size"
          name="backgroundSize"
          value={selectedElement.backgroundSize || ""}
          onChange={handleChange}
          displayOptions={["cover", "contain", "auto"]}
        />
        <DropdownInput
          label="Background Repeat"
          name="backgroundRepeat"
          value={selectedElement.backgroundRepeat || ""}
          onChange={handleChange}
          displayOptions={["repeat", "no-repeat", "repeat-x", "repeat-y"]}
        />
        <DropdownInput
          label="Background Position"
          name="backgroundPosition"
          value={selectedElement.backgroundPosition || ""}
          onChange={handleChange}
          displayOptions={["left", "center", "right", "top", "bottom"]}
        />
      </div>
    )}

    <button
      onClick={() => setShowPadding(!showPadding)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>
        {showPadding ? (
          <FiChevronDown className="text-gray-500" />
        ) : (
          <FiChevronRight className="text-gray-500" />
        )}
      </span>
      <span className="text-xs font-semibold">Padding</span>
    </button>
    {showPadding && (
      <div className="grid grid-cols-2 gap-2">
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
    )}

    <button
      onClick={() => setShowMargin(!showMargin)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>
        {showMargin ? (
          <FiChevronDown className="text-gray-500" />
        ) : (
          <FiChevronRight className="text-gray-500" />
        )}
      </span>
      <span className="text-xs font-semibold">Margin</span>
    </button>
    {showMargin && (
      <div className="grid grid-cols-2 gap-2">
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
    )}

    <button
      onClick={() => setShowBorder(!showBorder)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>
        {showBorder ? (
          <FiChevronDown className="text-gray-500" />
        ) : (
          <FiChevronRight className="text-gray-500" />
        )}
      </span>
      <span className="text-xs font-semibold">Border</span>
    </button>
    {showBorder && (
      <div className="grid grid-cols-2 gap-2">
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
          unit="px"
        />
        <PropertyInput
          label="Border Radius"
          name="borderRadius"
          value={selectedElement.borderRadius || ""}
          onChange={handleChange}
          type="number"
          unit="px"
        />
        <DropdownInput
          label="Border Style"
          name="borderStyle"
          value={selectedElement.borderStyle || ""}
          onChange={handleChange}
          displayOptions={["solid", "dashed", "dotted", "double"]}
        />
        {["Top", "Right", "Bottom", "Left"].map((pos) => (
          <React.Fragment key={pos}>
            <PropertyInput
              label={`Border ${pos} Color`}
              name={`border${pos}Color`}
              value={selectedElement[`border${pos}Color`] || ""}
              onChange={handleChange}
              type="color"
            />
            <PropertyInput
              label={`Border ${pos} Width`}
              name={`border${pos}Width`}
              value={selectedElement[`border${pos}Width`] || ""}
              onChange={handleChange}
              type="number"
              unit="px"
            />
            <DropdownInput
              label={`Border ${pos} Style`}
              name={`border${pos}Style`}
              value={selectedElement[`border${pos}Style`] || ""}
              onChange={handleChange}
              displayOptions={["solid", "dashed", "dotted", "double"]}
            />
          </React.Fragment>
        ))}
      </div>
    )}
  </>
);
