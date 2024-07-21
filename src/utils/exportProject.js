// src/utils/exportProject.js
export const exportProject = (elements, zoomLevel) => {
  const laptopScreenWidth = 1366;
  const laptopScreenHeight = 768;

  const calculatePercentage = (value, total) => (value / total) * 100;

  const generateElementStyle = (element, parentElement) => {
    const containerElement =
      parentElement || elements.find((el) => el.type === "container");

    let style = `
    position: absolute;
    left: ${calculatePercentage(
      element.x - containerElement.x,
      containerElement.width
    )}%;
    top: ${calculatePercentage(
      element.y - containerElement.y,
      containerElement.height
    )}%;
    width: ${calculatePercentage(element.width, containerElement.width)}%;
    height: ${calculatePercentage(element.height, containerElement.height)}%;
    ${element.paddingTop ? `padding-top: ${element.paddingTop}rem;` : ""}
    ${element.paddingRight ? `padding-right: ${element.paddingRight}rem;` : ""}
    ${
      element.paddingBottom
        ? `padding-bottom: ${element.paddingBottom}rem;`
        : ""
    }
    ${element.paddingLeft ? `padding-left: ${element.paddingLeft}rem;` : ""}
    ${element.marginTop ? `margin-top: ${element.marginTop}rem;` : ""}
    ${element.marginRight ? `margin-right: ${element.marginRight}rem;` : ""}
    ${element.marginBottom ? `margin-bottom: ${element.marginBottom}rem;` : ""}
    ${element.marginLeft ? `margin-left: ${element.marginLeft}rem;` : ""}
    ${element.fontSize ? `font-size: ${element.fontSize}rem;` : ""}
    ${element.fontFamily ? `font-family: ${element.fontFamily};` : ""}
    ${element.textColor ? `color: ${element.textColor};` : ""}
    ${
      element.backgroundColor
        ? `background-color: ${element.backgroundColor};`
        : ""
    }
    ${element.textAlign ? `text-align: ${element.textAlign};` : ""}
    ${element.cursor ? `cursor: ${element.cursor};` : ""}
    ${element.objectFit ? `object-fit: ${element.objectFit};` : ""}
    ${element.borderRadius ? `border-radius: ${element.borderRadius}rem;` : ""}
    ${element.borderColor ? `border-color: ${element.borderColor};` : ""}
    ${element.borderWidth ? `border-width: ${element.borderWidth}rem;` : ""}
    ${element.alignItems ? `align-items: ${element.alignItems};` : ""}
    ${
      element.justifyContent
        ? `justify-content: ${element.justifyContent};`
        : ""
    }
    ${element.display ? `display: ${element.display};` : ""}
    ${element.opacity ? `opacity: ${element.opacity};` : ""}
    ${element.filter ? `filter: ${element.filter};` : ""}
    ${element.transition ? `transition: ${element.transition};` : ""}
    ${element.overflowX ? `overflow-x: ${element.overflowX};` : ""}
    ${element.overflowY ? `overflow-y: ${element.overflowY};` : ""}
    ${element.shadow ? `box-shadow: ${element.shadow};` : ""}
    ${element.flexDirection ? `flex-direction: ${element.flexDirection};` : ""}
    ${
      element.textDecoration
        ? `text-decoration: ${element.textDecoration};`
        : ""
    }
    ${element.textTransform ? `text-transform: ${element.textTransform};` : ""}
    ${element.textShadow ? `text-shadow: ${element.textShadow};` : ""}
    ${element.textOverflow ? `text-overflow: ${element.textOverflow};` : ""}
    ${element.whiteSpace ? `white-space: ${element.whiteSpace};` : ""}
    ${element.wordBreak ? `word-break: ${element.wordBreak};` : ""}
    ${element.textIndent ? `text-indent: ${element.textIndent}rem;` : ""}
    ${element.verticalAlign ? `vertical-align: ${element.verticalAlign};` : ""}
    ${element.fontWeight ? `font-weight: ${element.fontWeight};` : ""}
    ${
      element.letterSpacing
        ? `letter-spacing: ${element.letterSpacing}rem;`
        : ""
    }
    ${element.lineHeight ? `line-height: ${element.lineHeight};` : ""}
    ${element.type === "button" ? `cursor: pointer;` : ""}
    ${element.disabled ? `opacity: 0.5; pointer-events: none;` : ""}
    `;

    return style;
  };

  const generateElementHTML = (element, elements, parentElement) => {
    const children = elements.filter((el) => el.parentId === element.id);
    const style = generateElementStyle(element, parentElement);

    const childElementsHTML = children
      .map((child) => generateElementHTML(child, elements, element))
      .join("\n");

    switch (element.type) {
      case "text":
        return `<p style="${style}" data-id="${element.id}">${element.content}${childElementsHTML}</p>`;
      case "button":
        return `<button style="${style}" data-id="${element.id}">${element.content}${childElementsHTML}</button>`;
      case "field":
        return `<input type="text" data-id="${element.id}" value="${element.value}" placeholder="${element.placeholder}" style="${style}"/>${childElementsHTML}`;
      case "image":
        return `<img src="${element.imageSrc}" data-id="${element.id}" alt="${element.content}" style="${style}"/>${childElementsHTML}`;
      case "group":
        return `<div style="${style}" data-id="${element.id}">${childElementsHTML}</div>`;
      default:
        return `<div style="${style}" data-id="${element.id}">${childElementsHTML}</div>`;
    }
  };

  const containerElement = elements.find((el) => el.type === "container");

  if (!containerElement) {
    console.error("No container element found.");
    return;
  }

  const containerStyle = `
    position: absolute;
    left: ${calculatePercentage(containerElement.x, laptopScreenWidth)}%;
    top: ${calculatePercentage(containerElement.y, laptopScreenHeight)}%;
    width: ${calculatePercentage(containerElement.width, laptopScreenWidth)}%;
    height: ${calculatePercentage(
      containerElement.height,
      laptopScreenHeight
    )}%;
    ${
      containerElement.backgroundColor
        ? `background-color: ${containerElement.backgroundColor};`
        : ""
    }
  `;

  const rootElements = elements.filter((el) => !el.parentId);

  const containerContent = rootElements
    .map((element) => generateElementHTML(element, elements, containerElement))
    .join("\n");

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
        <script>
          ${elements
            .map((element, index) => {
              return `
              ${
                element.clickEffect
                  ? `
                document.querySelector('[data-id="${element.id}"]').addEventListener('click', function() {
                  ${element.clickEffect}
                });
              `
                  : ""
              }
              ${element.activeColor
                              ? `
           const activeElement_${index} = document.querySelector('[data-id="${element.id}"]');
             activeElement_${index}.addEventListener('click', function() {
               if (!this.classList.contains('active')) {
                  this.style.backgroundColor = '${element.activeColor}';
                   this.classList.add('active');
                 } else {
                   this.style.backgroundColor = '';
                this.classList.remove('active');
                 }
             });
             `
                              : ""
                          }
              ${
                element.hoverBackgroundColor ||
                element.hoverBorderColor ||
                element.hoverShadow
                  ? `
                const hoverElement = document.querySelector('[data-id="${
                  element.id
                }"]');
                hoverElement.addEventListener('mouseenter', function() {
                  ${
                    element.hoverBackgroundColor
                      ? `this.style.backgroundColor = '${element.hoverBackgroundColor}';`
                      : ""
                  }
                  ${
                    element.hoverBorderColor
                      ? `this.style.borderColor = '${element.hoverBorderColor}';`
                      : ""
                  }
                  ${
                    element.hoverShadow
                      ? `this.style.boxShadow = '${element.hoverShadow}';`
                      : ""
                  }
                });
                hoverElement.addEventListener('mouseleave', function() {
                  ${
                    element.hoverBackgroundColor
                      ? `this.style.backgroundColor = '';`
                      : ""
                  }
                  ${
                    element.hoverBorderColor
                      ? `this.style.borderColor = '';`
                      : ""
                  }
                  ${element.hoverShadow ? `this.style.boxShadow = '';` : ""}
                });
              `
                  : ""
              }
              ${
                element.hoverColor
                  ? `
                const hoverElement_${index} = document.querySelector('[data-id="${element.id}"]');
                hoverElement_${index}.addEventListener('mouseenter', function() {
                  this.style.backgroundColor = '${element.hoverColor}';
                });
                hoverElement_${index}.addEventListener('mouseleave', function() {
                  this.style.backgroundColor = '${element.backgroundColor}';
                });
              `
                  : ""
              }
             
              ${
                element.required
                  ? `
                const inputElement = document.querySelector('[data-id="${element.id}"]');
                inputElement.required = true;
              `
                  : ""
              }
              ${
                element.maxLength
                  ? `
                const maxLengthElement = document.querySelector('[data-id="${element.id}"]');
                maxLengthElement.maxLength = ${element.maxLength};
              `
                  : ""
              }
              ${
                element.minLength
                  ? `
                const minLengthElement = document.querySelector('[data-id="${element.id}"]');
                minLengthElement.minLength = ${element.minLength};
              `
                  : ""
              }
              ${
                element.fieldType
                  ? `
                const fieldTypeElement = document.querySelector('[data-id="${element.id}"]');
                fieldTypeElement.type = '${element.fieldType}';
              `
                  : ""
              }
              ${
                element.placeholder
                  ? `
                const placeholderElement = document.querySelector('[data-id="${element.id}"]');
                placeholderElement.placeholder = '${element.placeholder}';
              `
                  : ""
              }
              ${
                element.value
                  ? `
                const valueElement = document.querySelector('[data-id="${element.id}"]');
                valueElement.value = '${element.value}';
              `
                  : ""
              }
              ${
                element.hoverEffects
                  ? `
                const hoverEffectsElement = document.querySelector('[data-id="${element.id}"]');
                hoverEffectsElement.addEventListener('mouseenter', function() {
                  ${element.hoverEffects.enter}
                });
                hoverEffectsElement.addEventListener('mouseleave', function() {
                  ${element.hoverEffects.leave}
                });
              `
                  : ""
              }
            `;
            })
            .join("\n")}
        </script>
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
