/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must exactly match example
  const headerRow = ['Hero (hero35)'];

  // Background image: none present in provided HTML, so use empty string
  const backgroundRow = [''];

  // Find the grid containing the content
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = document.createElement('div');
  if (grid) {
    // Get all direct children of grid
    const children = grid.querySelectorAll(':scope > *');
    // Usually, first child is text, second child is CTA
    // We'll collect them and preserve their order
    let textBlock = children[0];
    let ctaBlock = children[1];

    // Extract heading, subheading
    if (textBlock) {
      const heading = textBlock.querySelector('h2');
      if (heading) contentCell.appendChild(heading);
      const subheading = textBlock.querySelector('.subheading');
      if (subheading) contentCell.appendChild(subheading);
    }
    // Extract CTA button (if any)
    if (ctaBlock) {
      contentCell.appendChild(ctaBlock);
    }
  }

  // Only add cell if it has content (if not, leave empty div as per structure)
  const contentRow = [contentCell];

  // Compose block table (no Section Metadata)
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
