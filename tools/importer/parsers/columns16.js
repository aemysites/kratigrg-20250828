/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one column only
  const headerRow = ['Columns (columns16)'];

  // Main content extraction
  const mainContainer = element.querySelector('.container');
  const mainGrid = mainContainer.querySelector('.grid-layout.tablet-1-column');
  const leftBlock = mainGrid.children[0];
  const rightBlock = mainGrid.children[1];

  // Compose right column: paragraph, author, CTA
  const paragraph = rightBlock.querySelector('.rich-text');
  const authorRow = rightBlock.querySelector('.w-layout-grid .flex-horizontal');
  const ctaButton = rightBlock.querySelector('.w-layout-grid > a.button');
  const rightColumn = document.createElement('div');
  if (paragraph) rightColumn.appendChild(paragraph);
  if (authorRow) rightColumn.appendChild(authorRow);
  if (ctaButton) rightColumn.appendChild(ctaButton);

  // Images for next row
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const imgs = imageGrid ? Array.from(imageGrid.querySelectorAll('img')) : [];
  // Always enforce two columns for image row
  const imageRow = [imgs[0] || '', imgs[1] || ''];

  // Construct the table: header row single column, other rows two columns
  const cells = [
    headerRow,
    [leftBlock, rightColumn],
    imageRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
