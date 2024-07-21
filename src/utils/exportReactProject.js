// src/utils/exportProjectToReact.js
export const exportReactProject = (elements, zoomLevel) => {
    const laptopScreenWidth = 1366;
    const laptopScreenHeight = 768;
  
    const calculatePercentage = (value, total) => (value / total) * 100;
  
    const generateElementStyle = (element, parentElement) => {
      const containerElement = parentElement || elements.find((el) => el.type === "container");
  
      let style = {
        position: "absolute",
        left: `${calculatePercentage(element.x - containerElement.x, containerElement.width)}%`,
        top: `${calculatePercentage(element.y - containerElement.y, containerElement.height)}%`,
        width: `${calculatePercentage(element.width, containerElement.width)}%`,
        height: `${calculatePercentage(element.height, containerElement.height)}%`,
      };
  
      if (element.paddingTop) style.paddingTop = `${element.paddingTop}rem`;
      if (element.paddingRight) style.paddingRight = `${element.paddingRight}rem`;
      if (element.paddingBottom) style.paddingBottom = `${element.paddingBottom}rem`;
      if (element.paddingLeft) style.paddingLeft = `${element.paddingLeft}rem`;
      if (element.marginTop) style.marginTop = `${element.marginTop}rem`;
      if (element.marginRight) style.marginRight = `${element.marginRight}rem`;
      if (element.marginBottom) style.marginBottom = `${element.marginBottom}rem`;
      if (element.marginLeft) style.marginLeft = `${element.marginLeft}rem`;
      if (element.fontSize) style.fontSize = `${element.fontSize}rem`;
      if (element.fontFamily) style.fontFamily = element.fontFamily;
      if (element.textColor) style.color = element.textColor;
      if (element.backgroundColor) style.backgroundColor = element.backgroundColor;
      if (element.textAlign) style.textAlign = element.textAlign;
      if (element.cursor) style.cursor = element.cursor;
      if (element.objectFit) style.objectFit = element.objectFit;
      if (element.borderRadius) style.borderRadius = `${element.borderRadius}rem`;
      if (element.borderColor) style.borderColor = element.borderColor;
      if (element.borderWidth) style.borderWidth = `${element.borderWidth}rem`;
      if (element.alignItems) style.alignItems = element.alignItems;
      if (element.justifyContent) style.justifyContent = element.justifyContent;
      if (element.display) style.display = element.display;
      if (element.opacity) style.opacity = element.opacity;
      if (element.filter) style.filter = element.filter;
      if (element.transition) style.transition = element.transition;
      if (element.overflowX) style.overflowX = element.overflowX;
      if (element.overflowY) style.overflowY = element.overflowY;
      if (element.shadow) style.boxShadow = element.shadow;
      if (element.flexDirection) style.flexDirection = element.flexDirection;
      if (element.textDecoration) style.textDecoration = element.textDecoration;
      if (element.textTransform) style.textTransform = element.textTransform;
      if (element.textShadow) style.textShadow = element.textShadow;
      if (element.textOverflow) style.textOverflow = element.textOverflow;
      if (element.whiteSpace) style.whiteSpace = element.whiteSpace;
      if (element.wordBreak) style.wordBreak = element.wordBreak;
      if (element.textIndent) style.textIndent = `${element.textIndent}rem`;
      if (element.verticalAlign) style.verticalAlign = element.verticalAlign;
      if (element.fontWeight) style.fontWeight = element.fontWeight;
      if (element.letterSpacing) style.letterSpacing = `${element.letterSpacing}rem`;
      if (element.lineHeight) style.lineHeight = element.lineHeight;
      if (element.type === "button") style.cursor = "pointer";
      if (element.disabled) {
        style.opacity = 0.5;
        style.pointerEvents = "none";
      }
  
      if (element.hoverColor) style.hoverColor = element.hoverColor;
      if (element.hoverBackgroundColor) style.hoverBackgroundColor = element.hoverBackgroundColor;
      if (element.hoverBorderColor) style.hoverBorderColor = element.hoverBorderColor;
      if (element.hoverShadow) style.hoverShadow = element.hoverShadow;
  
      return style;
    };
  
    const generateReactComponent = (element, elements, parentElement) => {
      const children = elements.filter((el) => el.parentId === element.id);
      const style = generateElementStyle(element, parentElement);
      const styleString = JSON.stringify(style).replace(/\"/g, "'");
  
      const childElementsJSX = children.map((child) => generateReactComponent(child, elements, element)).join("\n");
  
      switch (element.type) {
        case "text":
          return `<p style={${styleString}}>${element.content}${childElementsJSX}</p>`;
        case "button":
          return `<button style={${styleString}}>${element.content}${childElementsJSX}</button>`;
        case "field":
          return `<input type="text" value="${element.value}" placeholder="${element.placeholder}" style={${styleString}}/>${childElementsJSX}`;
        case "image":
          return `<img src="${element.imageSrc}" alt="${element.content}" style={${styleString}}/>${childElementsJSX}`;
        case "group":
          return `<div style={${styleString}}>${childElementsJSX}</div>`;
        default:
          return `<div style={${styleString}}>${childElementsJSX}</div>`;
      }
    };
  
    const containerElement = elements.find((el) => el.type === "container");
  
    if (!containerElement) {
      console.error("No container element found.");
      return;
    }
  
    const containerStyle = {
      position: "absolute",
      left: `${calculatePercentage(containerElement.x, laptopScreenWidth)}%`,
      top: `${calculatePercentage(containerElement.y, laptopScreenHeight)}%`,
      width: `${calculatePercentage(containerElement.width, laptopScreenWidth)}%`,
      height: `${calculatePercentage(containerElement.height, laptopScreenHeight)}%`,
      backgroundColor: containerElement.backgroundColor || "transparent"
    };
    const containerStyleString = JSON.stringify(containerStyle).replace(/\"/g, "'");
  
    const rootElements = elements.filter((el) => !el.parentId);
  
    const containerContent = rootElements.map((element) => generateReactComponent(element, elements, containerElement)).join("\n");
  
    const reactComponent = `
      import React from 'react';
  
      const ProjectComponent = () => {
        return (
          <div style={${containerStyleString}}>
            ${containerContent}
          </div>
        );
      };
  
      export default ProjectComponent;
    `;
  
    const blob = new Blob([reactComponent], { type: "text/jsx" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ExportReactProject.jsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  




