export const exportProject = (elements,zoomLevel) => {
  const laptopScreenWidth = 1366;
  const laptopScreenHeight = 768;

  // Calculate percentages based on laptop screen size
  const calculatePercentage = (value, total) => (value / total) * 100;

  // Find the container element
  const containerElement = elements.find(el => el.type === 'container');

  if (!containerElement) {
    console.error('No container element found.');
    return;
  }

  // Generate container style
  const containerStyle = `
    position: absolute;
    left: ${calculatePercentage(containerElement.x, laptopScreenWidth)}%;
    top: ${calculatePercentage(containerElement.y, laptopScreenHeight)}%;
    width: ${calculatePercentage(containerElement.width, laptopScreenWidth)}%;
    height: ${calculatePercentage(containerElement.height, laptopScreenHeight)}%;
    ${containerElement.backgroundColor ? `background-color: ${containerElement.backgroundColor};` : ""}
  `;

  // Generate content for each element inside the container
  const childElements = elements.filter(el => el.type !== 'container').map(el => {
    const style = `
      position: absolute;
      left: ${calculatePercentage(el.x - containerElement.x, laptopScreenWidth)}%;
      top: ${calculatePercentage(el.y - containerElement.y, laptopScreenHeight)}%;
      width: ${calculatePercentage(el.width, laptopScreenWidth)}%;
      height: ${calculatePercentage(el.height, laptopScreenHeight)}%;
      ${el.paddingTop ? `padding-top: ${el.paddingTop}rem;` : ""}
      ${el.paddingRight ? `padding-right: ${el.paddingRight}rem;` : ""}
      ${el.paddingBottom ? `padding-bottom: ${el.paddingBottom}rem;` : ""}
      ${el.paddingLeft ? `padding-left: ${el.paddingLeft}rem;` : ""}
      ${el.marginTop ? `margin-top: ${el.marginTop}rem;` : ""}
      ${el.marginRight ? `margin-right: ${el.marginRight}rem;` : ""}
      ${el.marginBottom ? `margin-bottom: ${el.marginBottom}rem;` : ""}
      ${el.marginLeft ? `margin-left: ${el.marginLeft}rem;` : ""}
      ${el.fontSize ? `font-size: ${el.fontSize}rem;` : ""}
      ${el.fontFamily ? `font-family: ${el.fontFamily};` : ""}
      ${el.textColor ? `color: ${el.textColor};` : ""}
      ${el.backgroundColor ? `background-color: ${el.backgroundColor};` : ""}
      ${el.textAlign ? `text-align: ${el.textAlign};` : ""}
      ${el.cursor ? `cursor: ${el.cursor};` : ""}
      ${el.objectFit ? `object-fit: ${el.objectFit};` : ""}
      ${el.borderRadius ? `border-radius: ${el.borderRadius}rem;` : ""}
      ${el.borderColor ? `border-color: ${el.borderColor};` : ""}
      ${el.borderWidth ? `border-width: ${el.borderWidth}rem;` : ""}
      ${el.alignItems ? `align-items: ${el.alignItems};` : ""}
      ${el.justifyContent ? `justify-content: ${el.justifyContent};` : ""}
      ${el.display ? `display: ${el.display};` : ""}
    `;

    switch (el.type) {
      case "text":
        return `<p style="${style}">${el.content}</p>`;
      case "button":
        return `<button style="${style}">${el.content}</button>`;
      case "field":
        return `<input type="text" value="${el.value}" placeholder="${el.placeholder}" style="${style}"/>`;
      case "image":
        return `<img src="${el.imageSrc}" alt="${el.content}" style="${style}"/>`;
      case "group":
        return `<div style="${style}"></div>`;
      default:
        return '';
    }
  });

  const htmlContent = `
    <html>
      <head>
        <style>
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div style="${containerStyle}">
          ${childElements.join("\n")}
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