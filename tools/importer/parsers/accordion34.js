/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per specification
  const headerRow = ['Accordion (accordion34)'];

  // Get all direct children that are accordion panels
  const accordionPanels = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Prepare rows for each accordion item
  const rows = accordionPanels.map(panel => {
    // Title cell: Find the toggle title text
    const titleWrap = panel.querySelector('.w-dropdown-toggle');
    let titleEl;
    if (titleWrap) {
      // Directly reference the .paragraph-lg element (the label)
      titleEl = titleWrap.querySelector('.paragraph-lg') || titleWrap;
    } else {
      // fallback: create empty span
      titleEl = document.createElement('span');
    }

    // Content cell: Find the accordion content area
    const contentNav = panel.querySelector('.accordion-content');
    let contentEl;
    if (contentNav) {
      // Typically the content is inside .rich-text or similar
      // Reference the content div directly
      const richContent = contentNav.querySelector('.rich-text');
      if (richContent) {
        contentEl = richContent;
      } else {
        // fallback: reference contentNav directly
        contentEl = contentNav;
      }
    } else {
      contentEl = document.createElement('div');
    }

    return [titleEl, contentEl];
  });

  // Build the block table (first row header, rest are items)
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
