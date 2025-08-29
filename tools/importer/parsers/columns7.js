/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container inside the provided element
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children of the grid (these are columns in the block)
  const columns = Array.from(grid.children).filter(el => el.nodeType === 1);
  if (columns.length === 0) return;

  // Table header: one cell, no colspan
  const headerRow = ['Columns (columns7)'];

  // Content row: each column is a cell, use the actual DOM elements
  const contentRow = columns;

  // Construct the block table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
