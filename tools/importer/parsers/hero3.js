/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must exactly match the example
  const headerRow = ['Hero (hero3)'];

  // --- Extract Background Image (row 2) ---
  // Look for a direct child div containing an <img>
  let bgImg = null;
  const immediateDivs = element.querySelectorAll(':scope > div');
  for (const div of immediateDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // If not found, leave image cell blank
  const imageRow = [bgImg ? bgImg : ''];

  // --- Extract Content (row 3) ---
  // Find the card with main content
  let card = null;
  for (const div of immediateDivs) {
    // Look for any .card descendant
    card = div.querySelector('.card');
    if (card) break;
  }
  // If not found, fallback to any .card in the element
  if (!card) card = element.querySelector('.card');

  // Compose content cell: heading, subheading, call-to-action
  const contentCell = [];
  if (card) {
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentCell.push(h1);

    // Subheading (p)
    const p = card.querySelector('p');
    if (p) contentCell.push(p);

    // Call-to-action (links/buttons in .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include direct children (links/buttons)
      const ctas = Array.from(buttonGroup.children);
      contentCell.push(...ctas);
    }
  } else {
    // If card missing, leave cell blank
    contentCell.push('');
  }

  const contentRow = [contentCell.length ? contentCell : ['']];

  // Table with 3 rows, 1 column each
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
