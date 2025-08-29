/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns
  const columnWrappers = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if no columns detected, fallback to single cell (whole element)
  const numCols = columnWrappers.length || 1;

  // Compose cells for each column (images, as in source)
  const cellsRow = columnWrappers.length > 0 ? columnWrappers.map(wrapper => {
    const img = wrapper.querySelector('img');
    if (img) return img;
    return wrapper;
  }) : [element];

  // Create header row with correct format: single cell that spans all columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns29)';
  if (numCols > 1) {
    headerCell.setAttribute('colspan', numCols);
  }
  const headerRow = [headerCell];

  // Build table
  const cells = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
