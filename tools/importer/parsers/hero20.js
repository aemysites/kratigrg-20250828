/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match example exactly
  const headerRow = ['Hero (hero20)'];

  // 2. Row 2: background images
  // The images are inside .grid-layout.desktop-3-column
  let backgroundRowContent = '';
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length > 0) {
      // Reference all images in their order, in a wrapper div
      const imgDiv = document.createElement('div');
      imgs.forEach(img => imgDiv.appendChild(img));
      backgroundRowContent = imgDiv;
    }
  }

  // 3. Row 3: heading, subheading, CTAs
  let contentRowContent = '';
  // Find the main content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Compose all elements: heading, subheading, buttons, in order
    const contentNodes = [];
    // Heading (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentNodes.push(h1);
    // Subheading (p)
    const p = contentContainer.querySelector('p');
    if (p) contentNodes.push(p);
    // Button group
    const buttons = contentContainer.querySelector('.button-group');
    if (buttons) contentNodes.push(buttons);
    contentRowContent = contentNodes;
  }

  // Compose block table
  const cells = [
    headerRow,
    [backgroundRowContent],
    [contentRowContent]
  ];

  // Replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
