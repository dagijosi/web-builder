// src/utils/exportProjectToReactWithTailwind.js
export const exportReactProjectWithTailwind = (elements) => {
    const generateElementClasses = (element) => {
      let classes = '';
  
      if (element.paddingTop) classes += `pt-${element.paddingTop * 4} `;
      if (element.paddingRight) classes += `pr-${element.paddingRight * 4} `;
      if (element.paddingBottom) classes += `pb-${element.paddingBottom * 4} `;
      if (element.paddingLeft) classes += `pl-${element.paddingLeft * 4} `;
      if (element.marginTop) classes += `mt-${element.marginTop * 4} `;
      if (element.marginRight) classes += `mr-${element.marginRight * 4} `;
      if (element.marginBottom) classes += `mb-${element.marginBottom * 4} `;
      if (element.marginLeft) classes += `ml-${element.marginLeft * 4} `;
      if (element.fontSize) classes += `text-${element.fontSize} `;
      if (element.fontFamily) classes += `font-${element.fontFamily} `;
      if (element.textColor) classes += `text-[${element.textColor}] `;
      if (element.backgroundColor) classes += `bg-[${element.backgroundColor}] `;
      if (element.textAlign) classes += `text-${element.textAlign} `;
      if (element.cursor) classes += `cursor-${element.cursor} `;
      if (element.objectFit) classes += `object-${element.objectFit} `;
      if (element.borderRadius) classes += `rounded-${element.borderRadius} `;
      if (element.borderColor) classes += `border-[${element.borderColor}] `;
      if (element.borderWidth) classes += `border-${element.borderWidth} `;
      if (element.alignItems) classes += `items-${element.alignItems} `;
      if (element.justifyContent) classes += `justify-${element.justifyContent} `;
      if (element.display) classes += `block ${element.display} `;
      if (element.opacity) classes += `opacity-${element.opacity} `;
      if (element.filter) classes += `filter ${element.filter} `;
      if (element.transition) classes += `transition ${element.transition} `;
      if (element.overflowX) classes += `overflow-x-${element.overflowX} `;
      if (element.overflowY) classes += `overflow-y-${element.overflowY} `;
      if (element.shadow) classes += `shadow-${element.shadow} `;
      if (element.flexDirection) classes += `flex-${element.flexDirection} `;
      if (element.textDecoration) classes += `underline ${element.textDecoration} `;
      if (element.textTransform) classes += `uppercase ${element.textTransform} `;
      if (element.textShadow) classes += `shadow-[${element.textShadow}] `;
      if (element.textOverflow) classes += `truncate ${element.textOverflow} `;
      if (element.whiteSpace) classes += `whitespace-${element.whiteSpace} `;
      if (element.wordBreak) classes += `break-${element.wordBreak} `;
      if (element.textIndent) classes += `indent-${element.textIndent * 4} `;
      if (element.verticalAlign) classes += `align-${element.verticalAlign} `;
      if (element.fontWeight) classes += `font-${element.fontWeight} `;
      if (element.letterSpacing) classes += `tracking-${element.letterSpacing} `;
      if (element.lineHeight) classes += `leading-${element.lineHeight} `;
      if (element.type === "button") classes += `cursor-pointer `;
      if (element.disabled) classes += `opacity-50 pointer-events-none `;
  
      return classes.trim();
    };
  
    const generateReactComponent = (element, elements) => {
      const children = elements.filter((el) => el.parentId === element.id);
      const classes = generateElementClasses(element);
  
      const childElementsJSX = children.map((child) => generateReactComponent(child, elements)).join("\n");
  
      switch (element.type) {
        case "text":
          return `<p className="${classes}">${element.content}${childElementsJSX}</p>`;
        case "button":
          return `<button className="${classes}">${element.content}${childElementsJSX}</button>`;
        case "field":
          return `<input type="text" value="${element.value}" placeholder="${element.placeholder}" className="${classes}" />${childElementsJSX}`;
        case "image":
          return `<img src="${element.imageSrc}" alt="${element.content}" className="${classes}" />${childElementsJSX}`;
        case "group":
          return `<div className="${classes}">${childElementsJSX}</div>`;
        default:
          return `<div className="${classes}">${childElementsJSX}</div>`;
      }
    };
  
    const containerElement = elements.find((el) => el.type === "container");
  
    if (!containerElement) {
      console.error("No container element found.");
      return;
    }
  
    const containerClasses = `absolute left-0 top-0 w-full h-full ${generateElementClasses(containerElement)}`;
    
    const rootElements = elements.filter((el) => !el.parentId);
    
    const containerContent = rootElements.map((element) => generateReactComponent(element, elements)).join("\n");
    
    const reactComponent = `
      import React from 'react';
      
      const ProjectComponent = () => {
        return (
          <div className="${containerClasses}">
            ${containerContent}
          </div>
        );
      };
      
      export default ProjectComponent;
    `;
    
    const blob = new Blob([reactComponent], { type: "text/jsx" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ExportTailwindProject.jsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  