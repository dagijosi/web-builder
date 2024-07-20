import PropertyInput from "../PropertyInput";
import DropdownInput from "../DropdownInput";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export const renderContainerProperties = (
  selectedElement,
  handleChange,
  showOverflowProperties,
  setShowOverflowProperties,
  showFlexWrapProperties,
  setShowFlexWrapProperties
) => (
  <>
    <button
      onClick={() => setShowOverflowProperties(!showOverflowProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
    >
      <span>
        {showOverflowProperties ? <FiChevronDown /> : <FiChevronRight />}
      </span>
      <span className="text-xs font-semibold">Overflow Properties</span>
    </button>
    {showOverflowProperties && (
      <div className="grid grid-cols-2 gap-2">
        <DropdownInput
          label="Overflow X"
          name="overflowX"
          value={selectedElement.overflowX || "visible"}
          onChange={handleChange}
          displayOptions={["visible", "hidden", "scroll", "auto"]}
        />
        <DropdownInput
          label="Overflow Y"
          name="overflowY"
          value={selectedElement.overflowY || "visible"}
          onChange={handleChange}
          displayOptions={["visible", "hidden", "scroll", "auto"]}
        />
      </div>
    )}

    <button
      onClick={() => setShowFlexWrapProperties(!showFlexWrapProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
    >
      <span>
        {showFlexWrapProperties ? <FiChevronDown /> : <FiChevronRight />}
      </span>
      <span className="text-xs font-semibold">Flex Wrap Properties</span>
    </button>
    {showFlexWrapProperties && (
      <div className="grid grid-cols-2 gap-2">
        <DropdownInput
          label="Justify Content"
          name="justifyContent"
          value={selectedElement.justifyContent || "flex-start"}
          onChange={handleChange}
          displayOptions={[
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
          ]}
        />
        <DropdownInput
          label="Align Items"
          name="alignItems"
          value={selectedElement.alignItems || "stretch"}
          onChange={handleChange}
          displayOptions={[
            "stretch",
            "flex-start",
            "center",
            "flex-end",
            "baseline",
          ]}
        />
      </div>
    )}
  </>
);
