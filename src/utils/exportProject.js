export const exportProject = (elements, zoomLevel) => {
  const laptopScreenWidth = 1366;
  const laptopScreenHeight = 768;

  const calculatePercentage = (value, total) => (value / total) * 100;

  const generateElementStyle = (element, parentElement) => {
    const containerElement = parentElement || elements.find(el => el.type === 'container');

    return `
      position: absolute;
      left: ${calculatePercentage(element.x - containerElement.x, containerElement.width)}%;
      top: ${calculatePercentage(element.y - containerElement.y, containerElement.height)}%;
      width: ${calculatePercentage(element.width, containerElement.width)}%;
      height: ${calculatePercentage(element.height, containerElement.height)}%;
      ${element.paddingTop ? `padding-top: ${element.paddingTop}rem;` : ""}
      ${element.paddingRight ? `padding-right: ${element.paddingRight}rem;` : ""}
      ${element.paddingBottom ? `padding-bottom: ${element.paddingBottom}rem;` : ""}
      ${element.paddingLeft ? `padding-left: ${element.paddingLeft}rem;` : ""}
      ${element.marginTop ? `margin-top: ${element.marginTop}rem;` : ""}
      ${element.marginRight ? `margin-right: ${element.marginRight}rem;` : ""}
      ${element.marginBottom ? `margin-bottom: ${element.marginBottom}rem;` : ""}
      ${element.marginLeft ? `margin-left: ${element.marginLeft}rem;` : ""}
      ${element.fontSize ? `font-size: ${element.fontSize}rem;` : ""}
      ${element.fontFamily ? `font-family: ${element.fontFamily};` : ""}
      ${element.textColor ? `color: ${element.textColor};` : ""}
      ${element.backgroundColor ? `background-color: ${element.backgroundColor};` : ""}
      ${element.textAlign ? `text-align: ${element.textAlign};` : ""}
      ${element.cursor ? `cursor: ${element.cursor};` : ""}
      ${element.objectFit ? `object-fit: ${element.objectFit};` : ""}
      ${element.borderRadius ? `border-radius: ${element.borderRadius}rem;` : ""}
      ${element.borderColor ? `border-color: ${element.borderColor};` : ""}
      ${element.borderWidth ? `border-width: ${element.borderWidth}rem;` : ""}
      ${element.alignItems ? `align-items: ${element.alignItems};` : ""}
      ${element.justifyContent ? `justify-content: ${element.justifyContent};` : ""}
      ${element.display ? `display: ${element.display};` : ""}
    `;
  };

  const generateElementHTML = (element, elements, parentElement) => {
    const children = elements.filter(el => el.parentId === element.id);
    const style = generateElementStyle(element, parentElement);

    const childElementsHTML = children.map(child => generateElementHTML(child, elements, element)).join("\n");

    switch (element.type) {
      case "text":
        return `<p style="${style}">${element.content}${childElementsHTML}</p>`;
      case "button":
        return `<button style="${style}">${element.content}${childElementsHTML}</button>`;
      case "field":
        return `<input type="text" value="${element.value}" placeholder="${element.placeholder}" style="${style}"/>${childElementsHTML}`;
      case "image":
        return `<img src="${element.imageSrc}" alt="${element.content}" style="${style}"/>${childElementsHTML}`;
      case "group":
        return `<div style="${style}">${childElementsHTML}</div>`;
      default:
        return `<div style="${style}">${childElementsHTML}</div>`;
    }
  };

  const containerElement = elements.find(el => el.type === 'container');

  if (!containerElement) {
    console.error('No container element found.');
    return;
  }

  const containerStyle = `
    position: absolute;
    left: ${calculatePercentage(containerElement.x, laptopScreenWidth)}%;
    top: ${calculatePercentage(containerElement.y, laptopScreenHeight)}%;
    width: ${calculatePercentage(containerElement.width, laptopScreenWidth)}%;
    height: ${calculatePercentage(containerElement.height, laptopScreenHeight)}%;
    ${containerElement.backgroundColor ? `background-color: ${containerElement.backgroundColor};` : ""}
  `;

  const rootElements = elements.filter(el => !el.parentId);

  const containerContent = rootElements.map(element => generateElementHTML(element, elements, containerElement)).join("\n");

  const htmlContent = `
    <html>
      <head>
        <style>
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div style="${containerStyle}">
          ${containerContent}
        </div>
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "project.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
