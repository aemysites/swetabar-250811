/* global WebImporter */
export default function parse(element, { document }) {
  // Find 'All Articles' heading
  const titles = Array.from(element.querySelectorAll('.cmp-title__text'));
  const allArticlesTitle = titles.find(h => h.textContent.trim() === 'All Articles');
  if (!allArticlesTitle) return;

  // Find the image-list that directly follows the 'All Articles' title
  let curr = allArticlesTitle.closest('.title').nextElementSibling;
  let imageList = null;
  while (curr) {
    if (curr.classList.contains('image-list')) {
      imageList = curr;
      break;
    }
    curr = curr.nextElementSibling;
  }
  if (!imageList) return;

  // Compose the block table rows
  const rows = [['Cards (cards7)']]; // header row must match example exactly

  // For each card in the image-list
  imageList.querySelectorAll('li.cmp-image-list__item').forEach(li => {
    // Find the image (may be inside a nested structure)
    const img = li.querySelector('img');
    // Compose the text cell
    const content = li.querySelector('.cmp-image-list__item-content');
    const textContent = [];

    // Title (always present, inside .cmp-image-list__item-title-link > .cmp-image-list__item-title)
    const titleLink = content.querySelector('.cmp-image-list__item-title-link');
    const titleSpan = titleLink ? titleLink.querySelector('.cmp-image-list__item-title') : null;
    if (titleSpan && titleSpan.textContent.trim()) {
      const h = document.createElement('h3');
      h.textContent = titleSpan.textContent.trim();
      textContent.push(h);
    }
    // Description (may be absent)
    const descSpan = content.querySelector('.cmp-image-list__item-description');
    if (descSpan && descSpan.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = descSpan.textContent.trim();
      textContent.push(p);
    }
    // CTA (must use the original link, not a new one)
    if (titleLink && titleLink.hasAttribute('href')) {
      const cta = titleLink;
      // Only add a CTA if it doesn't look like the title already includes the entire link as a heading
      // The example shows the CTA is a separate link at the bottom. So create a new link only for the CTA (not re-use the title link)
      const a = document.createElement('a');
      a.href = cta.getAttribute('href');
      a.textContent = 'Read More';
      textContent.push(a);
    }
    // Add row for this card
    rows.push([
      img,
      textContent
    ]);
  });

  // Create and replace table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
