/* global WebImporter */
export default function parse(element, { document }) {
  // Find main container
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the main grid with content rows
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-landscape-1-column.grid-gap-sm');
  if (!mainGrid) return;

  // The first two children of mainGrid are: heading, testimonial
  const heading = mainGrid.children[0];
  const testimonial = mainGrid.children[1];

  // Find the bottom grid with avatar and logo
  const bottomGrid = mainGrid.querySelector('.w-layout-grid.grid-layout.mobile-landscape-1-column.grid-gap-sm.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (!bottomGrid) return;
  // Avatar and name: second child (first is divider)
  const avatarBlock = bottomGrid.children[1];
  // Logo: third child
  const logoBlock = bottomGrid.children[2];

  // Build table structure per example:
  // Header row: block name, SINGLE column
  const headerRow = ['Columns (columns26)'];
  // Row 1: heading (left), testimonial (right)
  const row1 = [heading, testimonial];
  // Row 2: avatarBlock (left), logoBlock (right)
  const row2 = [avatarBlock, logoBlock];
  const cells = [headerRow, row1, row2];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
