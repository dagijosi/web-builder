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
    >
      <span>
        {showCardProperties ? <FiChevronDown /> : <FiChevronRight />}
      </span>
      <span className="text-xs font-semibold">Card Properties</span>
    </button>
    {showCardProperties && (
      <div className="grid grid-cols-2 gap-2">
    <PropertyInput
      label="Shadow"
      name="shadow"
      value={selectedElement.shadow || ""}
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
          label="Overflow"
          name="overflow"
          value={selectedElement.overflow || "visible"}
          onChange={handleChange}
          displayOptions={["visible", "hidden", "scroll"]}
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
