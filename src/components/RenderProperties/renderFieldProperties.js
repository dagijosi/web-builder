import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";
import PropertyInput from "../PropertyInput";
import { renderTextProperties } from "./renderTextProperties";

export const renderFieldProperties = (
  selectedElement,
  handleChange,
  showStyling,
  setShowStyling,
  showTextProperties,
  setShowTextProperties,
  showFontProperties,
  setShowFontProperties
) => (
  <>
  {renderTextProperties(
    selectedElement,
    handleChange,
    showTextProperties,
    setShowTextProperties,
    showFontProperties,
    setShowFontProperties
  )}
  <button
    onClick={() => setShowStyling(!showStyling)}
    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
  >
    <span>{showStyling ? <FiChevronDown /> : <FiChevronRight />}</span>
    <span className="text-xs font-semibold">Styling</span>
  </button>
  {showStyling && (
    <div className="grid grid-cols-2 gap-2">
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
    <DropdownInput
      label="Field Type"
      name="fieldType"
      value={selectedElement.fieldType || ""}
      onChange={handleChange}
      displayOptions={["text", "number", "email", "password"]}
    />
    <PropertyInput
      label="Required"
      name="required"
      type="checkbox"
      checked={selectedElement.required || false}
      onChange={handleChange}
    />
    <PropertyInput
      label="Max Length"
      name="maxLength"
      value={selectedElement.maxLength || ""}
      onChange={handleChange}
    />
    <PropertyInput
      label="Min Length"
      name="minLength"
      value={selectedElement.minLength || ""}
      onChange={handleChange}
    />
    </div>
  )}
  </>
);
