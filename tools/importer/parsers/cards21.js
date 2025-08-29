/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as the block name
  const headerRow = ['Cards (cards21)'];
  
  // Try to locate the card content elements
  // Support for variations: find card container regardless of nesting
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Fallback: try to use element itself if structure changes
    cardBody = element;
  }

  // Image: first image in cardBody
  const img = cardBody.querySelector('img');
  
  // Title: heading (h4-heading)
  const heading = cardBody.querySelector('.h4-heading');

  // Description: look for any paragraph, span, or other text node (sometimes present)
  // In HTML provided, there is only a heading, but this handles potential future cases
  let description = null;
  // Find text nodes after the heading (if any)
  if (heading) {
    // Next sibling text nodes or paragraphs
    let next = heading.nextSibling;
    while (next) {
      if (next.nodeType === 3 && next.textContent.trim()) {
        // Text node
        description = document.createElement('span');
        description.textContent = next.textContent.trim();
        break;
      } else if (next.nodeType === 1 && (next.tagName === 'P' || next.tagName === 'SPAN')) {
        description = next;
        break;
      }
      next = next.nextSibling;
    }
  }

  // Compose the text cell: always array for robustness
  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);

  // Build the card row (always two columns)
  const cardRow = [img, textCell];
  
  // Build the full table structure
  const cells = [headerRow, cardRow];
  
  // Create the table using the utility
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the block table
  element.replaceWith(block);
}
