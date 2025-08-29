/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row matches example precisely
  const headerRow = ['Hero (hero14)'];

  // Row 2: Get the background image (optional)
  let backgroundImg = null;
  // The background image is usually nested inside a div with 'ix-parallax-scale-out-hero'
  // Find image inside header > div.grid-layout > div > div > img
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const img = parallaxDiv.querySelector('img');
    if (img) backgroundImg = img;
  }
  // If image not found, insert empty string (to keep table shape)
  const imgRow = [backgroundImg ? backgroundImg : ''];

  // Row 3: Get the headline, subheading, button(s) (optional)
  // All text content is inside the container div
  let contentDiv = null;
  const gridChildren = element.querySelectorAll(':scope > div > div');
  for (const div of gridChildren) {
    if (div.classList.contains('container')) {
      contentDiv = div;
      break;
    }
  }
  // If no contentDiv, use empty string
  const contentRow = [contentDiv ? contentDiv : ''];

  // Assemble the block table (1 column, 3 rows)
  const cells = [headerRow, imgRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the block table
  element.replaceWith(blockTable);
}
