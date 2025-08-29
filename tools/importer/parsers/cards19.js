/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the block name exactly
  const headerRow = ['Cards (cards19)'];

  // Get all immediate child divs representing cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [headerRow];

  cardDivs.forEach(card => {
    // Card layout: icon (svg inside .icon), and a paragraph
    // First cell: icon element
    let iconEl = card.querySelector('.icon');
    // Edge case: fallback to first svg if .icon missing
    if (!iconEl) {
      const svgEl = card.querySelector('svg');
      if (svgEl) {
        iconEl = svgEl.parentElement || svgEl;
      } else {
        iconEl = document.createElement('div'); // Empty if missing
      }
    }

    // Second cell: card text (the paragraph)
    const textEl = card.querySelector('p');
    // Edge case: if missing, create empty paragraph
    const cellText = textEl ? textEl : document.createElement('p');

    rows.push([iconEl, cellText]);
  });

  // Create the table block and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
