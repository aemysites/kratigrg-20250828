/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, matches example exactly
  const headerRow = ['Hero (hero12)'];

  // Find the grid layout inside the section
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = null;
  let contentCell = null;

  if (grid) {
    // The first child contains the background image
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 0) {
      // Find first <img> inside the first grid child
      bgImg = gridChildren[0].querySelector('img');
    }
    // The second child contains the content
    if (gridChildren.length > 1) {
      // Use the card-body inside the second grid child for content
      const cardBody = gridChildren[1].querySelector('.card-body');
      if (cardBody) {
        contentCell = cardBody;
      } else {
        // Fallback: use the whole second grid child
        contentCell = gridChildren[1];
      }
    }
  }
  // Edge case: if not found, use empty string to avoid error
  const cells = [
    headerRow,
    [bgImg || ''],
    [contentCell || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
