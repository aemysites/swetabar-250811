/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in example
  const headerRow = ['Cards (cards4)'];
  const cells = [headerRow];

  // Defensive: Handle missing list
  const list = element.querySelector('ul.cmp-image-list');
  if (!list) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // For each card (li)
  const items = list.querySelectorAll('li.cmp-image-list__item');
  items.forEach((li) => {
    // Image
    let imageEl = null;
    const imageLink = li.querySelector('a.cmp-image-list__item-image-link');
    if (imageLink) {
      const img = imageLink.querySelector('img');
      if (img) imageEl = img;
    }

    // Text cell
    const contentArr = [];
    // Title (strong)
    let titleText = '';
    const titleLink = li.querySelector('a.cmp-image-list__item-title-link');
    if (titleLink) {
      const titleSpan = titleLink.querySelector('span.cmp-image-list__item-title');
      if (titleSpan && titleSpan.textContent) {
        const strong = document.createElement('strong');
        strong.textContent = titleSpan.textContent;
        contentArr.push(strong);
      }
    }
    // Description
    const descSpan = li.querySelector('span.cmp-image-list__item-description');
    if (descSpan && descSpan.textContent.trim()) {
      contentArr.push(document.createElement('br'));
      contentArr.push(descSpan);
    }

    cells.push([
      imageEl,
      contentArr,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}