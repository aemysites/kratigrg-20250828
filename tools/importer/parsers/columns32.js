/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid which contains the two columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get the direct children (columns)
    const gridChildren = Array.from(grid.children);
    // Usually [img, contentDiv]
    // Find the image column
    const imgCol = gridChildren.find(el => el.tagName === 'IMG');
    const contentCol = gridChildren.find(el => el !== imgCol);
    // Always preserve order as in DOM
    const columnsOrdered = [];
    gridChildren.forEach((child) => {
      columnsOrdered.push(child);
    });
    columns = columnsOrdered;
  } else {
    // Fallback: try immediate children of the section
    columns = Array.from(element.children);
  }

  // Defensive: always make sure exactly two columns for this layout
  // (If there are >2, slice, if <2 pad with empty string)
  if (columns.length > 2) {
    columns = columns.slice(0, 2);
  }
  if (columns.length < 2) {
    while (columns.length < 2) columns.push('');
  }

  const cells = [
    ['Columns (columns32)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
