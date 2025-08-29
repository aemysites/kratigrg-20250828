/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container for the columns
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the grid layout which holds the columns (text, contacts, image)
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Expecting: one content (h2/h3/p), one ul (contact list), one img
  // But the grid could just have 3 children as in the HTML provided
  let infoCol = null;
  let contactsCol = null;
  let imageCol = null;
  // Identify each column by tag
  gridChildren.forEach((child) => {
    if (!infoCol && child.querySelector && child.querySelector('h2')) {
      infoCol = child;
    } else if (!contactsCol && child.tagName === 'UL') {
      contactsCol = child;
    } else if (!imageCol && child.tagName === 'IMG') {
      imageCol = child;
    }
  });
  // Compose the left cell: info + contacts (if present)
  const leftCell = [];
  if (infoCol) leftCell.push(infoCol);
  if (contactsCol) leftCell.push(contactsCol);
  // Compose the right cell: image
  const rightCell = imageCol ? [imageCol] : [];

  // The table header row
  const headerRow = ['Columns (columns18)'];
  // The table content row: two columns
  const contentRow = [leftCell, rightCell];
  // Build the table rows array
  const tableRows = [headerRow, contentRow];

  // Create and insert the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
