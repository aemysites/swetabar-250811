/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Grab all direct row divs within the block
  const rowDivs = Array.from(columnsBlock.children);
  if (rowDivs.length === 0) return;

  // Determine the maximum number of columns in any row
  let maxCols = 0;
  rowDivs.forEach(row => {
    const cols = row.children.length;
    if (cols > maxCols) maxCols = cols;
  });
  if (maxCols < 1) return;

  // Header: 'Columns' in first cell, rest empty to match number of columns
  const headerRow = ['Columns'];
  while (headerRow.length < maxCols) headerRow.push('');

  // Build content rows, referencing the original column divs
  const tableRows = rowDivs.map(row => {
    const colDivs = Array.from(row.children);
    // Pad if fewer than maxCols columns
    while (colDivs.length < maxCols) colDivs.push('');
    return colDivs;
  });

  // Construct and replace with the new block table
  const tableArray = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
