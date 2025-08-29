/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout for columns inside .container, or fallback
  let grid = element.querySelector('.container .grid-layout');
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }
  // Get only immediate children of grid as the columns
  let columns = [];
  if (grid) {
    columns = Array.from(grid.children).map(col => col);
  }
  // If no grid found, fallback to children of .container or top-level children
  if (!columns.length) {
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }
  // The columns might include irrelevant elements, let's filter out script, nav, or overlay elements
  columns = columns.filter(col => {
    const tag = col.tagName.toLowerCase();
    if (tag === 'nav' || tag === 'script') return false;
    if (col.classList.contains('nav') || col.classList.contains('w-nav-overlay')) return false;
    return true;
  });
  // Ensure all text content and markup are included by referencing the entire column elements
  // Create block table: header row and content row
  const headerRow = ['Columns (columns15)'];
  const contentRow = columns;
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
