/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name
  const headerRow = ['Hero'];

  // 2nd row: background image (optional)
  let imgEl = null;
  const imageSection = element.querySelector('.cmp-teaser__image');
  if (imageSection) {
    imgEl = imageSection.querySelector('img');
  }
  const imageRow = [imgEl ? imgEl : '']; // If missing, cell is empty string

  // 3rd row: title, description, CTA
  const contentArr = [];
  const contentSection = element.querySelector('.cmp-teaser__content');
  if (contentSection) {
    // Title (styled as Heading)
    const titleEl = contentSection.querySelector('.cmp-teaser__title');
    if (titleEl) {
      contentArr.push(titleEl);
    }
    // Description (could be missing)
    const descEl = contentSection.querySelector('.cmp-teaser__description');
    if (descEl) {
      contentArr.push(descEl);
    }
    // CTA (could be missing)
    const actionContainer = contentSection.querySelector('.cmp-teaser__action-container');
    if (actionContainer) {
      const ctaEl = actionContainer.querySelector('a');
      if (ctaEl) {
        contentArr.push(ctaEl);
      }
    }
  }
  const contentRow = [contentArr];

  // Assemble table rows
  const rows = [headerRow, imageRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
