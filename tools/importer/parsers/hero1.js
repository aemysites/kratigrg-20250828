/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, as per example
  const headerRow = ['Hero (hero1)'];

  // Get the grid layout block
  const grid = element.querySelector('.grid-layout');
  // Find the image: first img direct child of grid
  let imageEl = null;
  if (grid) {
    imageEl = grid.querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // Second column: the content block (contains h1, p, .button-group)
  let contentBlock = null;
  if (grid) {
    // Find all direct children that are divs (skip the image)
    const directDivs = Array.from(grid.children).filter(el => el.tagName === 'DIV');
    if (directDivs.length > 0) {
      contentBlock = directDivs[0];
    }
  }
  // Compose content cell: heading, subheading, and button group if available
  const contentCellElements = [];
  if (contentBlock) {
    // Heading (h1)
    const heading = contentBlock.querySelector('h1');
    if (heading) contentCellElements.push(heading);
    // Subheading (p)
    const subheading = contentBlock.querySelector('p');
    if (subheading) contentCellElements.push(subheading);
    // Button group (if present)
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) contentCellElements.push(buttonGroup);
  }
  const contentRow = [contentCellElements.length > 0 ? contentCellElements : ''];

  // Compose cells array in the required order
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
