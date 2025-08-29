/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for columns inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs (the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: a single cell (not multiple cells)
  const headerRow = ['Columns (columns4)'];

  // Second row: as many columns as there are columns in the grid
  const contentRow = columns;

  // Compose table: header is a single-cell row, content row has as many columns as needed
  const tableData = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
