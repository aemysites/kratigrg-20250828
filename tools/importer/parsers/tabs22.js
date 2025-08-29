/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the tab menu (labels)
  const tabMenu = Array.from(element.children).find(el => el.classList.contains('w-tab-menu'));
  if (!tabMenu) return;
  const tabLinks = Array.from(tabMenu.children).filter(link => link.matches('a'));
  // 2. Extract the tab labels
  const tabLabels = tabLinks.map(link => {
    // Try to get the inner div with the label (most likely)
    const maybeDiv = Array.from(link.children).find(child => child.textContent && child.textContent.trim());
    return maybeDiv ? maybeDiv.textContent.trim() : link.textContent.trim();
  });
  // 3. Get the tab panes (content)
  const tabContent = Array.from(element.children).find(el => el.classList.contains('w-tab-content'));
  if (!tabContent) return;
  const tabPanes = Array.from(tabContent.children).filter(pane => pane.classList.contains('w-tab-pane'));
  // 4. Build the rows: [label, content-block]
  // For each tab, reference the corresponding content block in the cell
  const rows = tabLabels.map((label, idx) => {
    const pane = tabPanes[idx];
    // Defensive: if no pane, skip
    if (!pane) return [label, ''];
    // The main tab content is typically a single grid div inside the pane
    // But to be robust, if not found, use the pane itself
    const mainContent = Array.from(pane.children).find(child => child.classList.contains('w-layout-grid')) || pane;
    return [label, mainContent];
  });
  // 5. Table header
  const headerRow = ['Tabs (tabs22)'];
  // 6. Compose block
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // 7. Replace original
  element.replaceWith(block);
}
