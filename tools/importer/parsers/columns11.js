/* global WebImporter */
export default function parse(element, { document }) {
  // Grab the main grid containing both columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the grid (should be two: left content, right image)
  const children = Array.from(mainGrid.children);

  // Find left column: the div with heading (h2)
  const leftColumn = children.find((child) =>
    child.querySelector && child.querySelector('h2')
  );
  // Find right column: the image
  const rightColumn = children.find((child) => child.tagName === 'IMG');

  // Fallbacks if columns not found
  if (!leftColumn && children.length > 0) {
    leftColumn = children[0];
  }
  if (!rightColumn && children.length > 1) {
    rightColumn = children[1];
  }

  // Table header matches requirement exactly
  const headerRow = ['Columns (columns11)'];
  // Table body: left and right columns as cells
  const secondRow = [leftColumn, rightColumn];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);
  // Replace the original element
  element.replaceWith(table);
}
