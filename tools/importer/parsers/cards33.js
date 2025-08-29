/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards33) block header
  const headerRow = ['Cards (cards33)'];
  const rows = [];
  // Get all top-level <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // The card structure: <a><div><img><div>...</div></div></a>
    const innerGrid = card.querySelector(':scope > div');
    if (!innerGrid) return;
    const img = innerGrid.querySelector('img');
    // Find text container
    let textContainer = null;
    const children = Array.from(innerGrid.children);
    for (let i=0; i < children.length; i++) {
      if (children[i].tagName === 'IMG') {
        textContainer = children[i+1];
        break;
      }
    }
    if (!img || !textContainer) return;
    // Build text cell
    const textParts = [];
    // Meta info (tag, read time)
    const metaRow = textContainer.querySelector('.flex-horizontal');
    if (metaRow) textParts.push(metaRow);
    // Title
    const title = textContainer.querySelector('h3, .h4-heading');
    if (title) textParts.push(title);
    // Description
    const desc = textContainer.querySelector('p');
    if (desc) textParts.push(desc);
    // CTA (look for the last <div> child with text 'Read')
    let cta = null;
    const divs = Array.from(textContainer.querySelectorAll('div'));
    for (let i = divs.length - 1; i >= 0; i--) {
      if (divs[i].textContent.trim().toLowerCase() === 'read') {
        cta = divs[i];
        break;
      }
    }
    if (cta) textParts.push(cta);
    rows.push([img, textParts]);
  });
  // Build table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}