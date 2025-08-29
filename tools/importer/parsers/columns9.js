/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be an array with a single string, one cell only
  const headerRow = ['Columns (columns9)'];

  // Find the columns grid in the footer block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return; // Do nothing if not found

  // Get all direct children of the grid as columns
  const contentRow = Array.from(grid.children);

  // Compose table: first row is header (single cell), second row is all columns
  const cells = [headerRow, contentRow];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
