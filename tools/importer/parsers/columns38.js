/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row, exactly as in the example
  const headerRow = ['Columns (columns38)'];

  // Each column div is its own row in the table, not a cell in a single row
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content for a single-cell row
  // If the column consists only of an image, reference only the image
  // Otherwise, reference the whole column div (covers future text or mixed content cases)
  const contentRows = columns.map(col => {
    const img = col.querySelector('img');
    if (col.children.length === 1 && img) {
      return [img]; // One cell row containing the image
    } else {
      return [col]; // One cell row containing the full column content
    }
  });

  // Build the table: header row, then one row per column, each with a single cell
  const cells = [headerRow, ...contentRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
