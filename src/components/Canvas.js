// src/components/Canvas.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import {
  updateElement,
  selectElement,
  deleteElement,
  updateZoomLevel,
} from "../features/elements/elementsSlice";
import { FiZoomIn, FiZoomOut, FiRotateCcw, FiTrash2 } from "react-icons/fi"; // Updated icon for reset zoom

const Canvas = () => {
  const elements = useSelector((state) => state.elements.elements);
  const selectedElementId = useSelector((state) => state.elements.selectedElementId);
  const zoomLevel = useSelector((state) => state.elements.zoomlevel);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const gridSize = 1; // Reduced grid size

  const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

  const handleDragStop = (id, e, d) => {
    const x = snapToGrid(d.x, gridSize);
    const y = snapToGrid(d.y, gridSize);
    dispatch(updateElement({ id, properties: { x, y } }));
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
    const zoomlevel=  zoom + 0.1
    dispatch(updateZoomLevel(zoomlevel))
  };

  const handleZoomOut = () => {
    setZoom((zoom) => Math.max(zoom - 0.1, 0.5)); // Min zoom level of 0.5
    const zoomlevel= zoom - 0.1
    dispatch(updateZoomLevel(zoomlevel))
  };

  const handleResetZoom = () => {
    setZoom(1); // Reset zoom level to 1x
    dispatch(updateZoomLevel(1))
  };

  const handleDelete = () => {
    if (selectedElementId) {
      dispatch(deleteElement(selectedElementId));
    }
  };
console.log(zoom,zoomLevel)
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
      <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }} className="relative">
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
            boxSizing: 'border-box', // Add this line to include the border in element dimensions
          };

          return (
            <Rnd
              key={element.id}
              size={{ width: element.width, height: element.height }}
              position={{ x: element.x, y: element.y }}
              onDragStop={(e, d) => handleDragStop(element.id, e, d)}
              onResizeStop={(e, direction, ref, delta, position) =>
                handleResizeStop(element.id, e, direction, ref, delta, position)
              }
             
              onClick={() => dispatch(selectElement(element.id))}
              style={{ border: "1px solid transparent" }}
              onMouseOver={(e) => e.currentTarget.style.border = "1px solid red"}
              onMouseOut={(e) => e.currentTarget.style.border = "1px solid transparent"}
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
                <img src={element.imageSrc} alt={element.content} style={style}/>
              )}
              {element.type === "container" && (
                <div style={style}>{element.content}</div>
              )}
              {element.type === "group" && (
                <div style={style}>{element.content}</div>
              )}
            </Rnd>
          );
        })}
      </div>
    </div>
  );
};

export default Canvas;