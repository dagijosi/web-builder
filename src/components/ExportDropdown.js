import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

const exportOptions = [
  { label: "HTML Export", describe: "Exports the project as a standalone HTML file", action: "handleExportHTML" },
  { label: "React Export", describe: "Exports the project as a React component" ,action: "handleExportReact" },
  { label: "TW Export", describe: "Exports the project as a React Tailwind component", action: "handleExportReactTailwind" }, // Shortened to "TW"
  { label: "SC Export", describe: "Exports the project as a Styled Components component", action: "handleExportStyledComponents" },
];

const ExportDropdown = ({
  handleExportHTML,
  handleExportReact,
  handleExportReactTailwind,
  handleExportStyledComponents,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleExport = (action) => {
    switch (action) {
      case "handleExportHTML":
        handleExportHTML();
        break;
      case "handleExportReact":
        handleExportReact();
        break;
      case "handleExportReactTailwind":
        handleExportReactTailwind();
        break;
      case "handleExportStyledComponents":
        handleExportStyledComponents();
        break;
      default:
        break;
    }
    closeDropdown();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs transition-all duration-300 ease-in-out"
        aria-label="Export Options"
        aria-expanded={isDropdownOpen}
      >
        <FiDownload className="inline-block mr-1" /> Export
      </button>
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {exportOptions.map((option, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              onClick={(e) => {
                e.preventDefault();
                handleExport(option.action);
              }}
              role="menuitem"
              title={option.describe}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportDropdown;
