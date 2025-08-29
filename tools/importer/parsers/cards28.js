/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly
  const headerRow = ['Cards (cards28)'];
  const cardRows = [];

  // Find all .w-tab-pane children in the given element
  // Each .w-tab-pane may or may not be active, so process all
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  tabPanes.forEach((pane) => {
    // The card grid is always .w-layout-grid within each pane
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is a direct child of the grid
    Array.from(grid.children).forEach((card) => {
      // Image: typically inside .utility-aspect-3x2 containing an img
      let imgElem = null;
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        const img = aspectDiv.querySelector('img');
        if (img) imgElem = img;
      }

      // Title: h3 with class .h4-heading
      const title = card.querySelector('h3');
      // Description: .paragraph-sm (may be multiple, but only first relevant)
      const desc = card.querySelector('.paragraph-sm');

      // Assemble text cell using existing elements, preserving heading and description
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);

      // Always create 2 cells: image/icon (may be empty string), text content
      cardRows.push([
        imgElem ? imgElem : '',
        textCell
      ]);
    });
  });

  const cells = [headerRow, ...cardRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
