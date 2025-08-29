/* global WebImporter */
export default function parse(element, { document }) {
  // The header must be a single column (exactly one cell in the first row)
  const headerRow = ['Columns (columns36)'];

  // Find grid containing the two main columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let columns = [];

  if (grid) {
    const columnDivs = Array.from(grid.children);
    if (columnDivs.length >= 2) {
      // First column: text and buttons
      const firstCol = columnDivs[0];
      const firstColContent = [];
      const h1 = firstCol.querySelector('h1');
      if (h1) firstColContent.push(h1);
      const subheading = firstCol.querySelector('.subheading');
      if (subheading) firstColContent.push(subheading);
      const buttonGroup = firstCol.querySelector('.button-group');
      if (buttonGroup) firstColContent.push(buttonGroup);
      const firstColContainer = document.createElement('div');
      firstColContent.forEach(el => {
        if (el.parentElement) firstColContainer.appendChild(el);
      });

      // Second column: images grid
      const secondCol = columnDivs[1];
      let imgGrid = secondCol.querySelector('.w-layout-grid');
      let images = [];
      if (imgGrid) {
        images = Array.from(imgGrid.querySelectorAll('img'));
      } else {
        images = Array.from(secondCol.querySelectorAll('img'));
      }
      const imagesContainer = document.createElement('div');
      images.forEach(img => {
        if (img.parentElement) imagesContainer.appendChild(img);
      });

      columns = [firstColContainer, imagesContainer];
    }
  }
  if (columns.length === 0) {
    columns = [element];
  }

  // To ensure the header row is a single column, pass it as [[headerRow[0]], columns]
  const table = WebImporter.DOMUtils.createTable([
    [headerRow[0]], // Single column header row
    columns         // Content row (multiple columns)
  ], document);

  element.replaceWith(table);
}
