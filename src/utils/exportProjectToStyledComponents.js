// src/utils/exportReactProjectWithStyledComponents.js
import styled from 'styled-components';

export const exportReactProjectWithStyledComponents = (elements, zoomLevel) => {
  const laptopScreenWidth = 1366;
  const laptopScreenHeight = 768;

  const calculatePercentage = (value, total) => (value / total) * 100;

  let componentCounter = 0;
  const componentNames = new Map();

  const generateComponentName = (element) => {
    if (!componentNames.has(element.id)) {
      componentNames.set(element.id, `${element.type}_${componentCounter++}`);
    }
    return componentNames.get(element.id);
  };

  const generateStyledComponent = (element, parentElement) => {
    const containerElement = parentElement || elements.find((el) => el.type === 'container');
    const componentName = generateComponentName(element);

    const styles = `
      position: absolute;
      left: ${calculatePercentage(element.x - containerElement.x, containerElement.width)}%;
      top: ${calculatePercentage(element.y - containerElement.y, containerElement.height)}%;
      width: ${calculatePercentage(element.width, containerElement.width)}%;
      height: ${calculatePercentage(element.height, containerElement.height)}%;
      ${element.paddingTop ? `padding-top: ${element.paddingTop}rem;` : ''}
      ${element.paddingRight ? `padding-right: ${element.paddingRight}rem;` : ''}
      ${element.paddingBottom ? `padding-bottom: ${element.paddingBottom}rem;` : ''}
      ${element.paddingLeft ? `padding-left: ${element.paddingLeft}rem;` : ''}
      ${element.marginTop ? `margin-top: ${element.marginTop}rem;` : ''}
      ${element.marginRight ? `margin-right: ${element.marginRight}rem;` : ''}
      ${element.marginBottom ? `margin-bottom: ${element.marginBottom}rem;` : ''}
      ${element.marginLeft ? `margin-left: ${element.marginLeft}rem;` : ''}
      ${element.fontSize ? `font-size: ${element.fontSize}rem;` : ''}
      ${element.fontFamily ? `font-family: ${element.fontFamily};` : ''}
      ${element.textColor ? `color: ${element.textColor};` : ''}
      ${element.backgroundColor ? `background-color: ${element.backgroundColor};` : ''}
      ${element.textAlign ? `text-align: ${element.textAlign};` : ''}
      ${element.cursor ? `cursor: ${element.cursor};` : ''}
      ${element.objectFit ? `object-fit: ${element.objectFit};` : ''}
      ${element.borderRadius ? `border-radius: ${element.borderRadius}rem;` : ''}
      ${element.borderColor ? `border-color: ${element.borderColor};` : ''}
      ${element.borderWidth ? `border-width: ${element.borderWidth}rem;` : ''}
      ${element.alignItems ? `align-items: ${element.alignItems};` : ''}
      ${element.justifyContent ? `justify-content: ${element.justifyContent};` : ''}
      ${element.display ? `display: ${element.display};` : ''}
      ${element.opacity ? `opacity: ${element.opacity};` : ''}
      ${element.filter ? `filter: ${element.filter};` : ''}
      ${element.transition ? `transition: ${element.transition};` : ''}
      ${element.overflowX ? `overflow-x: ${element.overflowX};` : ''}
      ${element.overflowY ? `overflow-y: ${element.overflowY};` : ''}
      ${element.shadow ? `box-shadow: ${element.shadow};` : ''}
      ${element.flexDirection ? `flex-direction: ${element.flexDirection};` : ''}
      ${element.textDecoration ? `text-decoration: ${element.textDecoration};` : ''}
      ${element.textTransform ? `text-transform: ${element.textTransform};` : ''}
      ${element.textShadow ? `text-shadow: ${element.textShadow};` : ''}
      ${element.textOverflow ? `text-overflow: ${element.textOverflow};` : ''}
      ${element.whiteSpace ? `white-space: ${element.whiteSpace};` : ''}
      ${element.wordBreak ? `word-break: ${element.wordBreak};` : ''}
      ${element.textIndent ? `text-indent: ${element.textIndent}rem;` : ''}
      ${element.verticalAlign ? `vertical-align: ${element.verticalAlign};` : ''}
      ${element.fontWeight ? `font-weight: ${element.fontWeight};` : ''}
      ${element.letterSpacing ? `letter-spacing: ${element.letterSpacing}rem;` : ''}
      ${element.lineHeight ? `line-height: ${element.lineHeight};` : ''}
      ${element.type === 'button' ? `cursor: pointer;` : ''}
      ${element.disabled ? `opacity: 0.5; pointer-events: none;` : ''}
    `;

    const hoverStyles = `
      ${element.hoverBackgroundColor ? `background-color: ${element.hoverBackgroundColor};` : ''}
      ${element.hoverBorderColor ? `border-color: ${element.hoverBorderColor};` : ''}
      ${element.hoverShadow ? `box-shadow: ${element.hoverShadow};` : ''}
      ${element.hoverColor ? `color: ${element.hoverColor};` : ''}
    `;

    return `
      const ${componentName} = styled.div\`
        ${styles}
        &:hover {
          ${hoverStyles}
        }
      \`;
    `;
  };

  const generateElementJSX = (element, elements, parentElement) => {
    const children = elements.filter((el) => el.parentId === element.id);
    const componentName = generateComponentName(element);
    const childElementsJSX = children.map((child) => generateElementJSX(child, elements, element)).join('\n');

    const eventHandlers = [];
    if (element.clickEffect) {
      eventHandlers.push(`onClick={() => { ${element.clickEffect} }}`);
    }
    if (element.hoverEffects) {
      eventHandlers.push(`onMouseEnter={() => { ${element.hoverEffects.enter} }}`);
      eventHandlers.push(`onMouseLeave={() => { ${element.hoverEffects.leave} }}`);
    }

    switch (element.type) {
      case 'text':
        return `<${componentName} ${eventHandlers.join(' ')}>${element.content}${childElementsJSX}</${componentName}>`;
      case 'button':
        return `<${componentName} ${eventHandlers.join(' ')}>${element.content}${childElementsJSX}</${componentName}>`;
      case 'field':
        return `<${componentName} as="input" type="text" value="${element.value}" placeholder="${element.placeholder}" ${eventHandlers.join(' ')} />${childElementsJSX}`;
      case 'image':
        return `<${componentName} as="img" src="${element.imageSrc}" alt="${element.content}" ${eventHandlers.join(' ')} />${childElementsJSX}`;
      case 'group':
        return `<${componentName} ${eventHandlers.join(' ')}>${childElementsJSX}</${componentName}>`;
      default:
        return `<${componentName} ${eventHandlers.join(' ')}>${childElementsJSX}</${componentName}>`;
    }
  };

  const containerElement = elements.find((el) => el.type === 'container');

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
    ${containerElement.backgroundColor ? `background-color: ${containerElement.backgroundColor};` : ''}
  `;

  const styledComponents = elements.map((element) => generateStyledComponent(element, containerElement)).join('\n');
  const rootElements = elements.filter((el) => !el.parentId);
  const containerContent = rootElements.map((element) => generateElementJSX(element, elements, containerElement)).join('\n');

  const reactComponent = `
    import React from 'react';
    import styled from 'styled-components';

    ${styledComponents}

    const Container = styled.div\`
      ${containerStyle}
    \`;

    const ExportedProject = () => (
      <Container>
        ${containerContent}
      </Container>
    );

    export default ExportedProject;
  `;

  // const blob = new Blob([reactComponent], { type: 'text/jsx' });
  // const link = document.createElement('a');
  // link.href = URL.createObjectURL(blob);
  // link.download = 'ExportedStyledProject.jsx';
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  return reactComponent;
};
