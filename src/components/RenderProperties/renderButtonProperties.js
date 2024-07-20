import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";
import PropertyInput from "../PropertyInput";
import { renderTextProperties } from "./renderTextProperties";

export const renderButtonProperties = (
  selectedElement,
  handleChange,
  showStatesProperties,
  setShowStatesProperties,
  showBehavior,
  setShowBehavior,
  showTextProperties,
  setShowTextProperties,
  showFontProperties,
  setShowFontProperties
) => (
  <>
    {/* Appearance */}
    {renderTextProperties(
      selectedElement,
      handleChange,
      showTextProperties,
      setShowTextProperties,
      showFontProperties,
      setShowFontProperties
    )}
    
    {/* Behavior */}
    <button
      onClick={() => setShowBehavior(!showBehavior)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>{showBehavior ? <FiChevronDown /> : <FiChevronRight />}</span>
      <span className="text-xs font-semibold">Behavior</span>
    </button>
    {showBehavior && (
      <div className="grid grid-cols-2 gap-2">
        <DropdownInput
          label="Cursor"
          name="cursor"
          value={selectedElement.cursor || "auto"}
          onChange={handleChange}
          displayOptions={["auto", "default", "pointer", "move", "not-allowed"]}
        />
        <DropdownInput
          label="Type"
          name="type"
          value={selectedElement.type || "button"}
          onChange={handleChange}
          displayOptions={["button", "submit", "reset"]}
        />
        <PropertyInput
          label="Disabled"
          name="disabled"
          value={selectedElement.disabled || false}
          onChange={handleChange}
          type="checkbox"
        />
        <PropertyInput
          label="Click Effect"
          name="clickEffect"
          value={selectedElement.clickEffect || "none"}
          onChange={handleChange}
        />
      </div>
    )}

    {/* States */}
    <button
      onClick={() => setShowStatesProperties(!showStatesProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md"
    >
      <span>{showStatesProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
      <span className="text-xs font-semibold">States</span>
    </button>
    {showStatesProperties && (
      <div className="grid grid-cols-2 gap-2">
        <PropertyInput
          label="Hover Color"
          name="hoverColor"
          value={selectedElement.hoverColor || "#dddddd"}
          onChange={handleChange}
          type="color"
        />
        <PropertyInput
          label="Active Color"
          name="activeColor"
          value={selectedElement.activeColor || "#cccccc"}
          onChange={handleChange}
          type="color"
        />
        <PropertyInput
          label="Focus Color"
          name="focusColor"
          value={selectedElement.focusColor || "#bbbbbb"}
          onChange={handleChange}
          type="color"
        />
        <PropertyInput
          label="Disabled Color"
          name="disabledColor"
          value={selectedElement.disabledColor || "#eeeeee"}
          onChange={handleChange}
          type="color"
        />
        <PropertyInput
          label="Transition"
          name="transition"
          value={selectedElement.transition || "all 0.3s ease"}
          onChange={handleChange}
        />
      </div>
    )}
  </>
);
