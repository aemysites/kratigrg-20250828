/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the example
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Extract all direct children that are <a> elements (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // 1. Image cell (first div contains the <img>)
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Defensive: if no image, cell will be null

    // 2. Text cell
    const textContents = [];

    // Tag and Date row (optional)
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) {
      // Collect tag and date
      const metaChildren = metaDiv.querySelectorAll(':scope > div');
      if (metaChildren.length > 0) {
        const tagDiv = metaChildren[0];
        if (tagDiv.textContent.trim()) {
          // Use the actual element
          textContents.push(tagDiv);
        }
      }
      if (metaChildren.length > 1) {
        const dateDiv = metaChildren[1];
        if (dateDiv.textContent.trim()) {
          textContents.push(dateDiv);
        }
      }
    }

    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading && heading.textContent.trim()) {
      // Use the actual heading element, not cloning
      textContents.push(heading);
    }
    // No additional description, so nothing further to extract

    // Add row to table: always 2 cells (image, text)
    rows.push([
      img,
      textContents
    ]);
  });

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
