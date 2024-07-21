import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import {
  updateElement,
  selectElement,
  deleteElement,
  updateZoomLevel,
  setParentElement,
} from "../features/elements/elementsSlice";
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import ConfirmationDialog from "./ConfirmationDialog";

const Canvas = () => {
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector(
    (state) => state.elements.selectedElementId
  );
  const zoomLevel = useSelector((state) => state.elements.zoomlevel);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    elementId: null,
  });
  const [draggingElementId, setDraggingElementId] = useState(null);
  const [distances, setDistances] = useState([]);
  const gridSize = 1; // Reduced grid size

  const snapToGrid = (value, gridSize) =>
    Math.round(value / gridSize) * gridSize;

  const handleDragStart = (id) => {
    setDraggingElementId(id);
  };

  const handleDrag = useCallback(
    (id, e, d) => {
      const x = snapToGrid(d.x, gridSize);
      const y = snapToGrid(d.y, gridSize);
      const element = elements.find((el) => el.id === id);
      const width = element.width;
      const height = element.height;

      const newDistances = elements
        .filter((el) => el.id !== id)
        .map((el) => {
          const dx = Math.max(el.x - x, x - (el.x + el.width));
          const dy = Math.max(el.y - y, y - (el.y + el.height));
          return {
            id: el.id,
            distance: Math.sqrt(dx * dx + dy * dy),
            element: el,
          };
        })
        .sort((a, b) => a.distance - b.distance);

      setDistances(newDistances);
    },
    [elements, gridSize]
  );

  const handleDragStop = (id, e, d) => {
    const x = snapToGrid(d.x, gridSize);
    const y = snapToGrid(d.y, gridSize);
    const element = elements.find((el) => el.id === id);
    const width = element.width;
    const height = element.height;

    dispatch(updateElement({ id, properties: { x, y } }));

    // Check if the element is within the bounds of another element
    elements.forEach((potentialParent) => {
      if (potentialParent.id !== id && isWithinBounds(x, y, width, height, potentialParent)) {
        dispatch(setParentElement({ childId: id, parentId: potentialParent.id }));
      } else if (potentialParent.id === id) {
        dispatch(setParentElement({ childId: id, parentId: null }));
      }
    });

    setDraggingElementId(null);
    setDistances([]);
  };

  const isWithinBounds = (x, y, width, height, element) => {
    const elementX = element.x;
    const elementY = element.y;
    const elementWidth = element.width;
    const elementHeight = element.height;

    return (
      x >= elementX &&
      y >= elementY &&
      (x + width) <= (elementX + elementWidth) &&
      (y + height) <= (elementY + elementHeight)
    );
  };

  const handleResizeStop = (id, e, direction, ref, delta, position) => {
    const width = snapToGrid(parseInt(ref.style.width), gridSize);
    const height = snapToGrid(parseInt(ref.style.height), gridSize);
    const x = snapToGrid(position.x, gridSize);
    const y = snapToGrid(position.y, gridSize);
    dispatch(updateElement({ id, properties: { width, height, x, y } }));
  };

  const handleZoomIn = () => {
    setZoom((zoom) => Math.min(zoom + 0.1, 3)); // Max zoom level of 3
    const zoomlevel = zoom + 0.1;
    dispatch(updateZoomLevel(zoomlevel));
  };

  const handleZoomOut = () => {
    setZoom((zoom) => Math.max(zoom - 0.1, 0.5)); // Min zoom level of 0.5
    const zoomlevel = zoom - 0.1;
    dispatch(updateZoomLevel(zoomlevel));
  };

  const handleResetZoom = () => {
    setZoom(1); // Reset zoom level to 1x
    dispatch(updateZoomLevel(1));
  };

  const handleDelete = () => {
    if (selectedElementId) {
      setConfirmationDialog({ isOpen: true, elementId: selectedElementId });
    }
  };

  const confirmDelete = () => {
    dispatch(deleteElement(confirmationDialog.elementId));
    setConfirmationDialog({ isOpen: false, elementId: null });
  };

  return (
    <div className="canvas bg-gray-100 relative w-full h-full ml-64 mt-16">
      {/* Zoom Controls */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        <button
          onClick={handleZoomIn}
          className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          title="Zoom In"
        >
          <FiZoomIn />
        </button>
        <button
          onClick={handleZoomOut}
          className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          title="Zoom Out"
        >
          <FiZoomOut />
        </button>
        <button
          onClick={handleResetZoom}
          className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          title="Reset Zoom"
        >
          <FiRotateCcw />
        </button>
        <button
          onClick={handleDelete}
          className="btn bg-red-500 text-white p-2 rounded hover:bg-red-600"
          title="Delete Selected Element"
        >
          <FiTrash2 />
        </button>
      </div>

      {/* Canvas Area */}
      <div
        style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        className="relative"
      >
        {elements.map((element) => {
          const style = {
            width: `${element.width}px`,
            height: `${element.height}px`,
            fontSize: `${element.fontSize}rem`,
            fontFamily: element.fontFamily,
            color: element.textColor,
            backgroundColor: element.backgroundColor,
            textAlign: element.textAlign,
            paddingTop: `${element.paddingTop}rem`,
            paddingRight: `${element.paddingRight}rem`,
            paddingBottom: `${element.paddingBottom}rem`,
            paddingLeft: `${element.paddingLeft}rem`,
            marginTop: `${element.marginTop}rem`,
            marginRight: `${element.marginRight}rem`,
            marginBottom: `${element.marginBottom}rem`,
            marginLeft: `${element.marginLeft}rem`,
            alignItems: element.alignItems,
            justifyContent: element.justifyContent,
            display: element.display,
            cursor: element.cursor,
            objectFit: element.objectFit,
            borderRadius: `${element.borderRadius}rem`,
            borderColor: element.borderColor,
            borderWidth: `${element.borderWidth}rem`,
            boxSizing: "border-box", // Include border in element dimensions
            opacity: element.opacity, // For images and other elements with opacity
            filter: element.filter, // For images and other elements with filters
            overflowX: element.overflowX, // For containers and groups
            overflowY: element.overflowY, // For containers and groups
            boxShadow: `${element.shadowXOffset || 0}px ${element.shadowYOffset || 0}px ${element.shadowBlurRadius || 0}px ${element.shadowSpreadRadius || 0}px ${element.shadowColor || "rgba(0, 0, 0, 0)"} ${element.shadowInset ? "inset" : ""}`,
            transition: element.transition, // For buttons and fields
            buttonType: element.buttonType, // For buttons
            // Dynamic properties requiring JS for application
            hoverBackgroundColor: element.hoverBackgroundColor,
            hoverBorderColor: element.hoverBorderColor,
            hoverShadow: element.hoverShadow,
            // Form-related properties
            required: element.required,
            maxLength: element.maxLength,
            minLength: element.minLength,
            fieldType: element.fieldType,
            placeholder: element.placeholder,
            value: element.value,
            // Text-specific properties
            textDecoration: element.textDecoration,
            textTransform: element.textTransform,
            textShadow: element.textShadow,
            textOverflow: element.textOverflow,
            whiteSpace: element.whiteSpace,
            wordBreak: element.wordBreak,
            textIndent: `${element.textIndent}rem`,
            verticalAlign: element.verticalAlign,
            fontWeight: element.fontWeight,
            letterSpacing: `${element.letterSpacing}rem`,
            lineHeight: element.lineHeight,
            flexDirection: element.flexDirection, // For flex layout
            hoverColor: element.hoverColor, // For flex layout
          };

          return (
            <Rnd
              key={element.id}
              position={{ x: element.x, y: element.y }}
              size={{ width: `${element.width}px`, height: `${element.height}px` }}
              onDragStart={() => handleDragStart(element.id)}
              onDrag={(e, d) => handleDrag(element.id, e, d)}
              onDragStop={(e, d) => handleDragStop(element.id, e, d)}
              onResizeStop={(e, direction, ref, delta, position) =>
                handleResizeStop(element.id, e, direction, ref, delta, position)
              }
              onClick={() => dispatch(selectElement(element.id))}
              
              onMouseOver={(e) =>
                (e.currentTarget.style.border = "1px solid red")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.border = "1px solid transparent")
              }
            >
              {element.type === "text" && <p style={style}>{element.content}</p>}
              {element.type === "button" && <button style={style}>{element.content}</button>}
              {element.type === "field" && (
                <input
                  type="text"
                  value={element.value}
                  placeholder={element.placeholder}
                  style={style}
                  onChange={(e) =>
                    dispatch(
                      updateElement({
                        id: element.id,
                        properties: { value: e.target.value },
                      })
                    )
                  }
                />
              )}
              {element.type === "image" && (
                <img
                  src={element.imageSrc}
                  alt={element.content}
                  style={style}
                />
              )}
              {element.type === "container" && (
                <div style={style}></div>
              )}
              {element.type === "group" && (
                <div style={style}></div>
              )}
            </Rnd>
          );
        })}

        {/* Render Distance Indicators */}
        {draggingElementId && distances.map(({ id, distance, element }) => (
          <div
            key={`distance-${id}`}
            style={{
              position: "absolute",
              top: element.y + (element.height / 2),
              left: element.x + (element.width / 2),
              transform: "translate(-50%, -50%)",
              color: "black",
              fontSize: "0.8rem",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "2px 4px",
              borderRadius: "3px",
              border: "1px solid black",
            }}
          >
            {Math.round(distance)} px
          </div>
        ))}
      </div>

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={() =>
          setConfirmationDialog({ isOpen: false, elementId: null })
        }
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this element?"
      />
    </div>
  );
};

export default Canvas;
