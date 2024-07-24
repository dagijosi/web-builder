export const exportReactProjectWithTailwind = (elements) => {
  const laptopScreenWidth = 1366;
  const laptopScreenHeight = 768;

  const calculatePercentage = (value, total) => (value / total) * 100;

  const generatePaddingMarginClasses = (element) => {
    let classes = "";
    const properties = ["padding", "margin"];
    const directions = ["Top", "Right", "Bottom", "Left"];

    properties.forEach((prop) => {
      directions.forEach((dir) => {
        const key = `${prop}${dir}`;
        if (element[key]) {
          classes += `${prop.charAt(0)}${dir.charAt(0).toLowerCase()}-${element[key] * 4} `;
        }
      });
    });
    return classes.trim();
  };

  const generateTextClasses = (element) => {
    const {
      fontSize,
      fontFamily,
      textColor,
      textAlign,
      textDecoration,
      textTransform,
      textShadow,
      textOverflow,
      whiteSpace,
      wordBreak,
      textIndent,
      verticalAlign,
    } = element;

    return [
      fontSize && `text-[${fontSize}rem]`,
      fontFamily && `font-${fontFamily}`,
      textColor && `text-[${textColor}]`,
      textAlign && `text-${textAlign}`,
      textDecoration && `underline ${textDecoration}`,
      textTransform && `uppercase ${textTransform}`,
      textShadow && `shadow-[${textShadow}]`,
      textOverflow && `truncate ${textOverflow}`,
      whiteSpace && `whitespace-${whiteSpace}`,
      wordBreak && `break-${wordBreak}`,
      textIndent && `indent-${textIndent * 4}`,
      verticalAlign && `align-${verticalAlign}`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const generateBackgroundClasses = (element) => {
    const { backgroundColor, hoverColor, activeColor } = element;
    return [
      backgroundColor && `bg-[${backgroundColor}]`,
      hoverColor && `hover:bg-[${hoverColor}]`,
      activeColor && `active:bg-[${activeColor}]`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const generateBorderClasses = (element) => {
    const { borderRadius, borderColor, borderWidth, hoverBorderColor } = element;
    return [
      borderRadius && `rounded-[${borderRadius}rem]`,
      borderColor && `border-[${borderColor}]`,
      borderWidth && `border-[${borderWidth}rem]`,
      hoverBorderColor && `hover:border-[${hoverBorderColor}]`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const generateElementClasses = (element, parentElement) => {
    const containerElement = parentElement || elements.find((el) => el.type === "container");

    const {
      display,
      opacity,
      filter,
      transition,
      overflowX,
      overflowY,
      shadow,
      flexDirection,
      disabled,
      hoverShadow,
      buttonType,
    } = element;

    const classes = [
      `absolute`,
      `left-[${calculatePercentage(element.x - containerElement.x, containerElement.width)}%]`,
      `top-[${calculatePercentage(element.y - containerElement.y, containerElement.height)}%]`,
      `w-[${calculatePercentage(element.width, containerElement.width)}%]`,
      `h-[${calculatePercentage(element.height, containerElement.height)}%]`,
      generatePaddingMarginClasses(element),
      generateTextClasses(element),
      generateBackgroundClasses(element),
      generateBorderClasses(element),
      display && `block ${display}`,
      opacity && `opacity-${opacity}`,
      filter && `filter ${filter}`,
      transition && `transition ${transition}`,
      overflowX && `overflow-x-${overflowX}`,
      overflowY && `overflow-y-${overflowY}`,
      shadow && `shadow-${shadow}`,
      flexDirection && `flex-${flexDirection}`,
      disabled && `opacity-50 pointer-events-none`,
      hoverShadow && `hover:shadow-[${hoverShadow}]`,
      buttonType && `btn-${buttonType}`,
    ]
      .filter(Boolean)
      .join(" ");

    return classes.trim();
  };

  const generateReactComponent = (element, elements, parentElement) => {
    const children = elements.filter((el) => el.parentId === element.id);
    const classes = generateElementClasses(element, parentElement);

    const childElementsJSX = children
      .map((child) => generateReactComponent(child, elements, element))
      .join("\n");

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

  const containerClasses = [
    `absolute`,
    `left-[${calculatePercentage(containerElement.x, laptopScreenWidth)}%]`,
    `top-[${calculatePercentage(containerElement.y, laptopScreenHeight)}%]`,
    `w-[${calculatePercentage(containerElement.width, laptopScreenWidth)}%]`,
    `h-[${calculatePercentage(containerElement.height, laptopScreenHeight)}%]`,
    `bg-[${containerElement.backgroundColor}]`,
  ]
    .filter(Boolean)
    .join(" ");

  const rootElements = elements.filter((el) => !el.parentId);

  const containerContent = rootElements
    .map((element) => generateReactComponent(element, elements, containerElement))
    .join("\n");

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

  // const blob = new Blob([reactComponent], { type: "text/jsx" });
  // const link = document.createElement("a");
  // link.href = URL.createObjectURL(blob);
  // link.download = "ExportTailwindProject.jsx";
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  return reactComponent;
};
