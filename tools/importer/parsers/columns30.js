/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  // Defensive: filter out empty columns
  const contentRow = columns.filter(col => col && (col.textContent.trim() || col.querySelector('*')));

  // Prepare the header row - must match exact block name
  const headerRow = ['Columns (columns30)'];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
