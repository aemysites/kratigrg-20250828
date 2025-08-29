/* global WebImporter */
export default function parse(element, { document }) {
  // Block header, as required
  const headerRow = ['Cards (cards25)'];
  const rows = [];
  // Select all immediate children that appear to be cards (image + title/desc)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => {
    // Must contain an img and a text node (h3 or p)
    return div.querySelector('img') && (div.querySelector('h3') || div.querySelector('p'));
  });
  cardDivs.forEach(div => {
    // Find the first img inside the card
    const img = div.querySelector('img');
    // Prepare text content: title (h3) and description (p)
    const title = div.querySelector('h3');
    const desc = div.querySelector('p');
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // If only description (no h3), still include it
    rows.push([img, textCell]);
  });
  // Build table structure: header, then all cards
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
