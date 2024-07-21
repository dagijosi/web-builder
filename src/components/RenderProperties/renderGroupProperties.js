import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import DropdownInput from "../DropdownInput";
import PropertyInput from "../PropertyInput";

export const renderGroupProperties = (
  selectedElement,
  handleChange,
  showCardProperties,
  setShowCardProperties,
  showFlexWrapProperties,
  setShowFlexWrapProperties
) => (
  <>
    <button
      onClick={() => setShowCardProperties(!showCardProperties)}
      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full p-1 focus:outline-none rounded-md mb-2"
      aria-expanded={showCardProperties}
    >
      <span>
        {showCardProperties ? <FiChevronDown /> : <FiChevronRight />}
      </span>
      <span className="text-xs font-semibold">Card Properties</span>
    </button>
    {showCardProperties && (
      <div className="grid grid-cols-2 gap-2">
        <PropertyInput
          label="Shadow X Offset"
          name="shadowXOffset"
          value={selectedElement.shadowXOffset || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Shadow Y Offset"
          name="shadowYOffset"
          value={selectedElement.shadowYOffset || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Shadow Blur Radius"
          name="shadowBlurRadius"
          value={selectedElement.shadowBlurRadius || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Shadow Spread Radius"
          name="shadowSpreadRadius"
          value={selectedElement.shadowSpreadRadius || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Shadow Color"
          name="shadowColor"
          value={selectedElement.shadowColor || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Shadow Inset"
          name="shadowInset"
          value={selectedElement.shadowInset || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Hover Background Color"
          name="hoverBackgroundColor"
          value={selectedElement.hoverBackgroundColor || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Hover Border Color"
          name="hoverBorderColor"
          value={selectedElement.hoverBorderColor || ""}
          onChange={handleChange}
        />
        <PropertyInput
          label="Hover Shadow"
          name="hoverShadow"
          value={selectedElement.hoverShadow || ""}
          onChange={handleChange}
        />
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
      aria-expanded={showFlexWrapProperties}
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
        <DropdownInput
          label="Display"
          name="display"
          value={selectedElement.display || "block"}
          onChange={handleChange}
          displayOptions={["block", "flex", "grid", "inline-block"]}
        />
        <DropdownInput
          label="Flex Direction"
          name="flexDirection"
          value={selectedElement.flexDirection || "row"}
          onChange={handleChange}
          displayOptions={["row", "row-reverse", "column", "column-reverse"]}
        />
      </div>
    )}
  </>
);
