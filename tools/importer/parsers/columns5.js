/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: For each column, combine all direct children (elements and text)
  function getColumnContent(columnDiv) {
    // Gather all element children and non-empty text nodes
    const children = Array.from(columnDiv.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim().length > 0;
      return false;
    });
    // For a single child, just return it (so the cell contains the element directly)
    if (children.length === 1) {
      return children[0];
    }
    // For multiple, return as an array (so createTable puts them in the same cell)
    if (children.length > 1) {
      return children;
    }
    // If no children, return an empty string.
    return '';
  }

  // Structure per example: header row (single cell), then one row with N columns
  const headerRow = ['Columns (columns5)'];
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columnDivs.map(getColumnContent);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
