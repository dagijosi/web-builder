import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import {
  updateElement,
  selectElement,
} from "../features/elements/elementsSlice";

const Canvas = () => {
  const elements = useSelector((state) => state.elements.elements);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const gridSize = 1; // Reduced grid size

  const handleDragStop = (id, e, d) => {
    const snapToGrid = (value, gridSize) =>
      Math.round(value / gridSize) * gridSize;
    const x = snapToGrid(d.x, gridSize);
    const y = snapToGrid(d.y, gridSize);
    dispatch(updateElement({ id, properties: { x, y } }));
  };

  const handleResizeStop = (id, e, direction, ref, delta, position) => {
    const snapToGrid = (value, gridSize) =>
      Math.round(value / gridSize) * gridSize;
    const width = snapToGrid(parseInt(ref.style.width), gridSize);
    const height = snapToGrid(parseInt(ref.style.height), gridSize);
    const x = snapToGrid(position.x, gridSize);
    const y = snapToGrid(position.y, gridSize);
    dispatch(updateElement({ id, properties: { width, height, x, y } }));
  };
  const handleZoomIn = () => {
    setZoom((zoom) => Math.min(zoom + 0.1, 3)); // Max zoom level of 3
  };

  const handleZoomOut = () => {
    setZoom((zoom) => Math.max(zoom - 0.1, 0.5)); // Min zoom level of 0.5
  };
  return (
    <div className="canvas bg-gray-100 h-screen w-screen relative ml-64 mr-64 ">
      <div style={{ transform: `scale(${zoom})` }}>
        {elements.map((element) => {
          const style = {
            width: element.width,
            height: element.height,
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
              className="absolute border w-fit h-fit"
              onClick={() => dispatch(selectElement(element.id))}
              style={style}
            >
              {element.type === "text" && <p>{element.content}</p>}
              {element.type === "button" && <button>{element.content}</button>}
              {element.type === "field" && (
                <input
                  type="text"
                  value={element.value}
                  placeholder={element.placeholder}
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
                <img src={element.imageSrc} alt={element.content} />
              )}
            </Rnd>
          );
        })}
      </div>
    </div>
  );
};

export default Canvas;
