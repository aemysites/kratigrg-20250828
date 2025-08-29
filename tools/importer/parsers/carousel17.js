/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for block
  const headerRow = ['Carousel (carousel17)'];

  // Locate the image grid: find the element with class 'grid-layout' under this section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all top-level divs in the grid (each is a 'slide')
  const slideDivs = Array.from(grid.children);

  // For each slide, get the inner .utility-aspect-2x3 then the img
  // Also attempt to extract any text content for the second cell (if present)
  const slideRows = slideDivs.map((slideDiv) => {
    const aspect = slideDiv.querySelector('.utility-aspect-2x3');
    if (!aspect) return null;
    const img = aspect.querySelector('img');
    if (!img) return null;
    // Try to extract any text node outside the aspect container
    // (for future-proofing against slides with text)
    let textContent = '';
    // Collect any elements that are direct children of the slideDiv, not being aspect container
    const slideChildren = Array.from(slideDiv.children).filter(child => child !== aspect);
    if (slideChildren.length > 0) {
      // If there is any extra content, group it into a div
      const textDiv = document.createElement('div');
      slideChildren.forEach(child => textDiv.appendChild(child));
      textContent = textDiv;
    }
    return [img, textContent || ''];
  }).filter(Boolean);

  // Compose the cells array
  const cells = [headerRow, ...slideRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
