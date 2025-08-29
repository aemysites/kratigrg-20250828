/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect all cards (including from nested grids)
  function getCards(parent) {
    const cards = [];
    for (const child of parent.children) {
      if (child.classList.contains('utility-link-content-block')) {
        cards.push(child);
      } else if (child.classList.contains('grid-layout')) {
        cards.push(...getCards(child));
      }
    }
    return cards;
  }

  // Locate the main grid inside the element
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    if (element.classList.contains('grid-layout')) grid = element;
    else return;
  }

  const headerRow = ['Cards (cards37)'];
  const tableRows = [headerRow];
  const cards = getCards(grid);

  for (const card of cards) {
    // Find the image (first img in aspect wrapper, or direct)
    let img = null;
    const imgAspect = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgAspect) {
      img = imgAspect.querySelector('img');
    }
    if (!img) {
      img = card.querySelector('img');
    }
    // Find heading (prefer h3, then h2/h4)
    let heading = card.querySelector('h3, h2, h4, h5, h6');
    // Find first paragraph
    let desc = card.querySelector('p');
    // Find CTA (class 'button')
    let cta = card.querySelector('.button, .cta, a.button, button');

    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    tableRows.push([
      img ? img : '',
      textCell.length === 1 ? textCell[0] : (textCell.length > 1 ? textCell : '')
    ]);
  }

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
