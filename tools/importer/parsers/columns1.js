/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Identify logo, navigation, search columns by their class
  const logoDiv = columns.find(div => div.classList.contains('cmp-image--logo'));
  const navDiv = columns.find(div => div.classList.contains('cmp-navigation--header'));
  const searchDiv = columns.find(div => div.classList.contains('cmp-search--header'));

  // Compose rows as per required 2x2 structure after the header
  // Header row: one column as per example
  const headerRow = ['Columns (columns1)'];
  // First row: logo | navigation
  const row1 = [logoDiv || '', navDiv || ''];
  // Second row: search | empty
  const row2 = [searchDiv || '', ''];

  // Build the table
  const cells = [headerRow, row1, row2];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
