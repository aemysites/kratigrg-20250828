/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all immediate anchor card children
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));
  cardEls.forEach(card => {
    // First cell: Image element from the .utility-aspect-3x2 container
    let img = null;
    const aspectDiv = card.querySelector('.utility-aspect-3x2');
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    }

    // Second cell: tag, heading, paragraph (all as existing elements, in order)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];
    if (textContainer) {
      // Tag (if any)
      const tag = textContainer.querySelector('.tag-group .tag');
      if (tag) {
        // Wrap tag in a div for spacing
        const tagDiv = document.createElement('div');
        tagDiv.appendChild(tag);
        cellContent.push(tagDiv);
      }
      // Heading (h3)
      const h3 = textContainer.querySelector('h3');
      if (h3) {
        cellContent.push(h3);
      }
      // Description (paragraph)
      const p = textContainer.querySelector('p');
      if (p) {
        cellContent.push(p);
      }
    }
    rows.push([
      img,
      cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
