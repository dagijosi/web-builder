import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";
import PropertyInput from "../PropertyInput";

export const renderImageProperties = (
  selectedElement,
  handleChange,
  showGeneralProperties,
  setShowGeneralProperties,
  showStylingProperties,
  setShowStylingProperties,
  showEffectsProperties,
  setShowEffectsProperties
) => (
  <>
  <button
    onClick={() => setShowGeneralProperties(!showGeneralProperties)}
    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
  >
    <span>{showGeneralProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
    <span className="text-xs font-semibold">General Properties</span>
  </button>
  {showGeneralProperties && (
    <div >
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
    </div>
  )}

  <button
    onClick={() => setShowStylingProperties(!showStylingProperties)}
    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
  >
    <span>{showStylingProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
    <span className="text-xs font-semibold">Styling Properties</span>
  </button>
  {showStylingProperties && (
    <div>
      <PropertyInput
        label="Opacity"
        name="opacity"
        value={selectedElement.opacity || ""}
        onChange={handleChange}
        type="number"
        min="0"
        max="1"
        step="0.1"
        placeholder="0 to 1"
      />
      <PropertyInput
        label="Filter"
        name="filter"
        value={selectedElement.filter || ""}
        onChange={handleChange}
        placeholder="grayscale(100%), blur(5px)"
      />
    </div>
  )}

  <button
    onClick={() => setShowEffectsProperties(!showEffectsProperties)}
    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
  >
    <span>{showEffectsProperties ? <FiChevronDown /> : <FiChevronRight />}</span>
    <span className="text-xs font-semibold">Effects Properties</span>
  </button>
  {showEffectsProperties && (
    <div>
      <PropertyInput
        label="Hover Effects"
        name="hoverEffects"
        value={selectedElement.hoverEffects || ""}
        onChange={handleChange}
        placeholder="transform scale(1.1)"
      />
    </div>
  )}
</>
);
