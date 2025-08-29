/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the three main content groups
  // 1. The main (left) block: the first .utility-link-content-block (with image, tag, heading, text)
  const mainCol = grid.querySelector('a.utility-link-content-block');

  // 2. The two feature blocks to the right of the main image (each has .utility-link-content-block, inside the first .flex-horizontal)
  // They are grouped inside the first .flex-horizontal.flex-vertical.flex-gap-sm that does NOT have an id ending in 'b8' (that's the long right column)
  const flexGroups = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  let topRightFlex = null;
  let rightLongFlex = null;
  flexGroups.forEach(fg => {
    if (!topRightFlex && fg.querySelector('img')) {
      topRightFlex = fg;
    } else if (!rightLongFlex && fg.querySelector('h3') && !fg.querySelector('img')) {
      rightLongFlex = fg;
    }
  });

  // 3. The right long column: all a.utility-link-content-block in rightLongFlex (headings and paragraphs separated by dividers)
  // (note: there are divider elements between these blocks - we will ignore them as per the markdown example)

  // Compose column 1 content (mainCol)
  const col1Els = [];
  if (mainCol) col1Els.push(mainCol);

  // Compose column 2 content (topRightFlex + rightLongFlex)
  const col2Els = [];
  if (topRightFlex) {
    const links = Array.from(topRightFlex.querySelectorAll('a.utility-link-content-block'));
    col2Els.push(...links);
  }
  if (rightLongFlex) {
    const links = Array.from(rightLongFlex.querySelectorAll('a.utility-link-content-block'));
    col2Els.push(...links);
  }

  // Build the table
  const headerRow = ['Columns (columns2)'];
  const contentRow = [col1Els, col2Els];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
