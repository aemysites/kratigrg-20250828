/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block header
  const headerRow = ['Cards (cards8)'];

  // Get all card containers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // Get the image (first child)
    const img = card.querySelector('img');
    // Build the content cell from available text and alt
    let textContent = '';
    let textEl;
    if (img) {
      textContent = img.getAttribute('alt') || '';
    }
    // Create the text cell for the card
    textEl = document.createElement('div');
    if (textContent) {
      // Try to split alt into a title and description, using parenthesis or dash as separator
      // e.g., "[team] image of individual team member (for a department store)"
      let mainTitle = textContent;
      let desc = '';
      // Try parenthesis
      const parenIdx = textContent.indexOf('(');
      if (parenIdx > 0) {
        mainTitle = textContent.substring(0, parenIdx).trim();
        desc = textContent.substring(parenIdx).trim();
      } else {
        // Try dash
        const dashIdx = textContent.indexOf(' - ');
        if (dashIdx > 0) {
          mainTitle = textContent.substring(0, dashIdx).trim();
          desc = textContent.substring(dashIdx + 3).trim();
        }
      }
      // Add title (bold)
      if (mainTitle) {
        const strong = document.createElement('strong');
        strong.textContent = mainTitle;
        textEl.appendChild(strong);
      }
      // Add description below
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc;
        textEl.appendChild(p);
      }
    }
    return [img, textEl];
  });

  // Construct the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
