/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all columns (each column contains an image)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Extract the image from each column
  const rowCells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // The header row must be a single cell (one column), matching the example structure.
  // The next row contains all column contents.
  const cells = [
    ['Columns (columns6)'], // Single header cell
    rowCells                // Next row: one cell per column, as per example
  ];

  // Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}