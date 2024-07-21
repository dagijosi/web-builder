import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";
import PropertyInput from "../PropertyInput";

export const renderTextProperties = (
  selectedElement,
  handleChange,
  showTextProperties,
  setShowTextProperties,
  showFontProperties,
  setShowFontProperties,
) => (
  <>
    <button
      onClick={() => setShowTextProperties(!showTextProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>{showTextProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
      <span className="text-xs font-semibold">Text Properties</span>
    </button>
    {showTextProperties && (
      <div className="grid grid-cols-2 gap-2 p-2">
        <DropdownInput
          label="Text Align"
          name="textAlign"
          value={selectedElement.textAlign || ""}
          onChange={handleChange}
          displayOptions={["left", "center", "right"]}
        />
        <PropertyInput
          label="Text Color"
          name="textColor"
          value={selectedElement.textColor || "#000000"}
          onChange={handleChange}
          type="color"
        />
        <DropdownInput
          label="Text Transform"
          name="textTransform"
          value={selectedElement.textTransform || ""}
          onChange={handleChange}
          displayOptions={["none", "capitalize", "uppercase", "lowercase"]}
        />
        <PropertyInput
          label="Text Decoration"
          name="textDecoration"
          value={selectedElement.textDecoration || "none"}
          onChange={handleChange}
          displayOptions={["none", "underline", "overline", "line-through"]}
        />
        <PropertyInput
          label="Text Shadow"
          name="textShadow"
          value={selectedElement.textShadow || "none"}
          onChange={handleChange}
        />
        <DropdownInput
          label="Text Overflow"
          name="textOverflow"
          value={selectedElement.textOverflow || "visible"}
          onChange={handleChange}
          displayOptions={["visible", "hidden", "clip", "ellipsis"]}
        />
        <DropdownInput
          label="White Space"
          name="whiteSpace"
          value={selectedElement.whiteSpace || "normal"}
          onChange={handleChange}
          displayOptions={["normal", "nowrap", "pre", "pre-wrap", "pre-line"]}
        />
        <DropdownInput
          label="Word Break"
          name="wordBreak"
          value={selectedElement.wordBreak || "normal"}
          onChange={handleChange}
          displayOptions={["normal", "break-word", "keep-all"]}
        />
        <PropertyInput
          label="Text Indent"
          name="textIndent"
          value={selectedElement.textIndent || "0"}
          onChange={handleChange}
          type="number"
          unit="rem"
        />
        <DropdownInput
          label="Vertical Align"
          name="verticalAlign"
          value={selectedElement.verticalAlign || "baseline"}
          onChange={handleChange}
          displayOptions={["baseline", "top", "middle", "bottom"]}
        />
      </div>
    )}

    <button
      onClick={() => setShowFontProperties(!showFontProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>{showFontProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
      <span className="text-xs font-semibold">Font Properties</span>
    </button>
    {showFontProperties && (
      <div className="grid grid-cols-2 gap-2 p-2">
        <PropertyInput
          label="Font Size"
          name="fontSize"
          value={selectedElement.fontSize || "1rem"}
          onChange={handleChange}
          type="number"
          unit="rem"
        />
        <PropertyInput
          label="Font Family"
          name="fontFamily"
          value={selectedElement.fontFamily || "Arial, sans-serif"}
          onChange={handleChange}
        />
        <PropertyInput
          label="Font Weight"
          name="fontWeight"
          value={selectedElement.fontWeight || ""}
          onChange={handleChange}
          type="number"
        />
        <PropertyInput
          label="Letter Spacing"
          name="letterSpacing"
          value={selectedElement.letterSpacing || ""}
          onChange={handleChange}
          type="number"
          unit="rem"
        />
        <PropertyInput
          label="Line Height"
          name="lineHeight"
          value={selectedElement.lineHeight || "1.5"}
          onChange={handleChange}
          type="number"
          unit="rem"
        />
      </div>
    )}
  </>
);
