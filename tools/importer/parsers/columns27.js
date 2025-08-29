/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    // No grid found, do not process
    return;
  }

  // Get the grid's immediate children (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) {
    // Not enough columns for a Columns block
    return;
  }

  // First column: the content block (text & button)
  const firstCol = columns[0];
  // Second column: the image
  let secondCol = columns[1];
  let img = secondCol;
  if (img.tagName !== 'IMG') {
    img = img.querySelector('img');
  }

  // If for some reason the image is missing, leave cell empty
  const imageCell = img || '';

  // Compose the columns block table
  const cells = [
    ['Columns (columns27)'],
    [firstCol, imageCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
