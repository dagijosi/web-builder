export const exportProject = (elements) => {
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
    `;

    let content = el.content || "";
    if (el.type === "image" && el.imageSrc) {
      content = `<img src="${el.imageSrc}" style="width: 100%; height: 100%; object-fit: ${el.objectFit || "fill"};" />`;
    } else if (el.type === "field") {
      content = `<input type="text" value="${el.value || ""}" placeholder="${el.placeholder || ""}" style="width: 100%; height: 100%;" />`;
    }

    return `<div style="${style}">${content}</div>`;
  }).join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Project</title>
      <style>
        body { margin: 0; }
        .canvas { position: relative; width: 100vw; height: 100vh; }
      </style>
    </head>
    <body>
      <div class="canvas">
        <div style="${containerStyle}">
          ${containerElement.content || "Container"}
          ${childElements}
        </div>
      </div>
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project.html";
  a.click();
  URL.revokeObjectURL(url);
};
