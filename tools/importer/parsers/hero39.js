/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches exactly
  const headerRow = ['Hero (hero39)'];

  // 2. Get the background image: first <img> (should only be 1 in this hero)
  const backgroundImg = element.querySelector('img');

  // 3. Main content: Find the heading, paragraph, cta (all in the right-side grid cell)
  // This is the second .w-layout-grid.grid-layout inside .container
  // We'll select the deepest grid with h1 inside
  let contentRoot = null;
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  for (const grid of grids) {
    if (grid.querySelector('h1')) {
      contentRoot = grid;
      break;
    }
  }

  // Compose content: headline, description, CTA (each optional)
  const contentEls = [];
  if (contentRoot) {
    // Headline
    const headline = contentRoot.querySelector('h1');
    if (headline) contentEls.push(headline);
    // Subheading/description
    // Sometimes there's a <p>, could be more than one; get the first p in .flex-vertical or fallback
    const flexVertical = contentRoot.querySelector('.flex-vertical');
    let paragraph = null;
    if (flexVertical) {
      paragraph = flexVertical.querySelector('p');
    }
    if (!paragraph) {
      paragraph = contentRoot.querySelector('p');
    }
    if (paragraph) contentEls.push(paragraph);
    // CTA(s): look for .button-group or any <a> in .flex-vertical
    let cta = null;
    const buttonGroup = contentRoot.querySelector('.button-group');
    if (buttonGroup) {
      cta = buttonGroup;
    } else if (flexVertical) {
      cta = flexVertical.querySelector('a');
    }
    if (cta) contentEls.push(cta);
  }

  // 4. Compose rows for the table
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentEls]
  ];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
