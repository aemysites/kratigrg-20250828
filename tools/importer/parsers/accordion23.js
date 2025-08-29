/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion23 block header as in the example
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Get all the .divider sections, each is an accordion item
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    // Each .divider contains a .w-layout-grid with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = Array.from(grid.children);
      // Find the title and content nodes by class
      const title = children.find(el => el.classList.contains('h4-heading'));
      const content = children.find(el => el.classList.contains('rich-text'));
      // If either title or content is missing, still push but with empty placeholder to preserve row structure
      if (title || content) {
        rows.push([
          title || document.createElement('div'),
          content || document.createElement('div')
        ]);
      }
    }
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
