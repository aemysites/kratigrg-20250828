/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid as columns
  const columns = Array.from(grid.children);
  // Edge case: if there are no columns, do not create the table
  if (columns.length === 0) return;

  // The header row must exactly match the block name in the example
  const headerRow = ['Columns (columns31)'];
  // Each column cell references the actual column element (not innerHTML, not cloned)
  const contentRow = columns.map(col => col);

  // Structure: first row = header, second row = columns side-by-side,
  // NO extra rows, NO extra cells, NO markdown formatting
  const cells = [headerRow, contentRow];

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
