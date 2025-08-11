/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Columns (columns3)'];

  // Extract content - the content and image sides
  const content = element.querySelector('.cmp-teaser__content');
  const imageSection = element.querySelector('.cmp-teaser__image');

  // Handle possible missing columns (edge case)
  const col1 = content || document.createElement('div');
  const col2 = imageSection || document.createElement('div');

  // Structure: header row, then columns row (2 columns)
  const cells = [
    headerRow,
    [col1, col2]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}