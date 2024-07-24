// src/components/Modal.js

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  solarizedlight,
  solarizedDarkAtom,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  js as beautifyJs,
  html as beautifyHtml,
  css as beautifyCss,
} from "js-beautify";
import {
  FaTimes,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaEraser,
  FaCopy,
  FaDownload,
  FaExpandArrowsAlt,
  FaList,
  FaPalette,
  FaMoon,
  FaSun,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

// Language options
const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "python", label: "Python" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
];

// Theme options
const themeOptions = [
  { value: "solarizedlight", label: "Light" },
  { value: "solarizedDarkAtom", label: "Dark" },
];

const Modal = ({
  isOpen,
  onClose,
  code,
  initialLanguage,
  onDownload,
  title,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("solarizedlight");
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontFamily, setFontFamily] = useState("monospace");
  const lineRefs = useRef([]);

  useEffect(() => {
    setSelectedLanguage(initialLanguage);
  }, [initialLanguage]);

  const codeString = useMemo(() => {
    return typeof code === "string" ? code : code ? String(code) : "";
  }, [code]);

  const formattedCode = useMemo(() => {
    try {
      switch (selectedLanguage) {
        case "javascript":
        case "tsx":
          return beautifyJs(codeString, {
            indent_size: 2,
            space_in_empty_paren: true,
            max_preserve_newlines: 2,
            jslint_happy: true,
          });
        case "html":
          return beautifyHtml(codeString, {
            indent_size: 2,
            space_in_empty_paren: true,
            end_with_newline: false,
            preserve_newlines: true,
            max_preserve_newlines: 2,
          });
        case "css":
          return beautifyCss(codeString, {
            indent_size: 2,
            preserve_newlines: true,
            max_preserve_newlines: 2,
          });
        case "json":
          return JSON.stringify(JSON.parse(codeString), null, 2);
        case "jsx":
          return beautifyHtml(codeString, {
            indent_size: 2,
            space_in_empty_paren: true,
            end_with_newline: false,
            preserve_newlines: true,
            max_preserve_newlines: 2,
          });
        case "python":
          return codeString;
        default:
          return codeString;
      }
    } catch (err) {
      console.error("Code formatting error:", err);
      return codeString;
    }
  }, [codeString, selectedLanguage]);

  const debounceRef = useRef(null);

  const debounceSearch = useCallback(
    (value) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        if (!value) {
          setHighlightedLines([]);
          return;
        }
        const lines = formattedCode.split("\n");
        const highlighted = lines
          .map((line, index) =>
            line.toLowerCase().includes(value.toLowerCase()) ? index + 1 : -1
          )
          .filter((index) => index !== -1);
        setHighlightedLines(highlighted);
        setCurrentHighlightIndex(0);
      }, 300);
    },
    [formattedCode]
  );

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm, debounceSearch]);

  useEffect(() => {
    if (highlightedLines.length > 0 && lineRefs.current[highlightedLines[currentHighlightIndex]]) {
      lineRefs.current[highlightedLines[currentHighlightIndex]].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentHighlightIndex, highlightedLines]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(formattedCode)
      .then(() => alert("Code copied to clipboard"))
      .catch((err) => alert("Failed to copy code: " + err.message));
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleToggleTheme = () => {
    setSelectedTheme((prevTheme) =>
      prevTheme === "solarizedlight" ? "solarizedDarkAtom" : "solarizedlight"
    );
  };

  const handleToggleLineNumbers = () => {
    setShowLineNumbers(!showLineNumbers);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHighlightedLines([]);
    setCurrentHighlightIndex(0);
  };

  const handleNextHighlight = () => {
    if (highlightedLines.length > 0) {
      setCurrentHighlightIndex(
        (currentHighlightIndex + 1) % highlightedLines.length
      );
    }
  };

  const handlePrevHighlight = () => {
    if (highlightedLines.length > 0) {
      setCurrentHighlightIndex(
        (currentHighlightIndex - 1 + highlightedLines.length) %
          highlightedLines.length
      );
    }
  };

  const handleIncreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.min(prevFontSize + 2, 32));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 8));
  };

  const handleLineHeightChange = (event) => {
    setLineHeight(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const highlightLineStyle = {
    backgroundColor: "rgba(255, 255, 0, 0.3)",
  };

  if (!isOpen) return null;

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div
        className={`fixed inset-0 flex items-center justify-center z-20 ${
          isFullscreen ? "p-0" : "p-4"
        } bg-gray-800 bg-opacity-75`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`bg-white rounded-lg shadow-lg ${
            isFullscreen ? "w-full h-full" : "max-w-4xl h-full"
          } mx-4 md:mx-0 overflow-hidden transition-transform duration-300 transform scale-100`}
        >
          <div className="flex justify-between items-center p-3 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleFullscreen}
                aria-label="Toggle fullscreen"
                className="text-gray-600 hover:text-gray-800 transition"
              >
                <FaExpandArrowsAlt size={20} />
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="text-gray-600 hover:text-gray-800 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
          <div className="px-3 py-2 flex flex-col border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center mb-2">
              <div className="flex-1 md:mr-4 mb-4 md:mb-0">
                <label
                  htmlFor="language-select"
                  className="text-gray-700 font-medium"
                >
                  Language
                </label>
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="block w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 md:ml-4">
                <label
                  htmlFor="search-term"
                  className="text-gray-700 font-medium"
                >
                  Search
                </label>
                <div className="flex mt-1">
                  <input
                    id="search-term"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 border rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                  />
                  <button
                    onClick={handlePrevHighlight}
                    disabled={highlightedLines.length === 0}
                    className="bg-gray-600 text-white p-2 rounded-r-md hover:bg-gray-700 transition"
                    aria-label="Previous highlight"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={handleNextHighlight}
                    disabled={highlightedLines.length === 0}
                    className="bg-gray-600 text-white p-2 rounded-r-md hover:bg-gray-700 transition"
                    aria-label="Next highlight"
                  >
                    <FaArrowRight />
                  </button>
                  <button
                    onClick={handleClearSearch}
                    disabled={!searchTerm}
                    className="bg-red-500 text-white p-2 rounded-r-md hover:bg-red-600 transition"
                    aria-label="Clear search"
                  >
                    <FaEraser />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <div className="space-x-2">
                <button
                  onClick={handleToggleLineNumbers}
                  className="bg-blue-500 text-white text-sm p-1.5 rounded-lg hover:bg-blue-600 transition"
                  aria-label="Toggle line numbers"
                >
                  <FaList />
                </button>
                <button
                  onClick={handleToggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 rounded-md hover:bg-gray-200 transition"
                >
                  {selectedTheme === "solarizedlight" ? <FaMoon /> : <FaSun />}
                </button>
                <button
                  onClick={handleIncreaseFontSize}
                  className="bg-blue-500 text-white text-sm p-2 rounded-lg hover:bg-blue-600 transition"
                  aria-label="Increase font size"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={handleDecreaseFontSize}
                  className="bg-blue-500 text-white text-sm p-2 rounded-lg hover:bg-blue-600 transition"
                  aria-label="Decrease font size"
                >
                  <FaMinus />
                </button>
                <label
                  htmlFor="line-height"
                  className="text-gray-700 font-medium"
                >
                  Line Height
                </label>
                <input
                  id="line-height"
                  type="number"
                  value={lineHeight}
                  onChange={handleLineHeightChange}
                  className="w-16 p-1.5 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  step="0.1"
                  max="3"
                />
                <label
                  htmlFor="font-family"
                  className="text-gray-700 font-medium"
                >
                  Font Family
                </label>
                <input
                  id="font-family"
                  type="text"
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                  className="w-32 p-1.5 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  onClick={() => onDownload(formattedCode, selectedLanguage)}
                  className="bg-green-500 text-white text-sm p-2 rounded-lg hover:bg-green-600 transition"
                  aria-label="Download code"
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          </div>
          <div
            className={`px-2 py-1 ${isFullscreen ? "max-h-[70vh]" : "max-h-[65vh]"} overflow-auto border-t border-gray-200`}
          >
            <button
              onClick={handleCopy}
              className={`flex gap-1 justify-center items-center absolute right-8 ${
                selectedTheme === "solarizedDarkAtom" ? "text-white" : "text-black"
              } p-2 rounded-lg hover:bg-yellow-600 transition`}
              aria-label="Copy code"
            >
              <FaCopy /> Copy
            </button>
            <SyntaxHighlighter
              language={selectedLanguage}
              style={
                selectedTheme === "solarizedDarkAtom"
                  ? solarizedDarkAtom
                  : solarizedlight
              }
              showLineNumbers={showLineNumbers}
              wrapLines
              lineProps={(lineNumber) => ({
                ref: (el) => (lineRefs.current[lineNumber] = el),
                style: highlightedLines.includes(lineNumber)
                  ? lineNumber === highlightedLines[currentHighlightIndex]
                    ? { ...highlightLineStyle, border: "2px solid red" }
                    : highlightLineStyle
                  : {},
                className: `line-${lineNumber}`,
              })}
              customStyle={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                fontFamily: fontFamily,
              }}
              className="bg-gray-100 p-4 rounded-md border border-gray-300"
            >
              {formattedCode}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  code: PropTypes.string,
  initialLanguage: PropTypes.string,
  onDownload: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  code: "",
  initialLanguage: "javascript",
  title: "Preview Code",
};

export default Modal;
