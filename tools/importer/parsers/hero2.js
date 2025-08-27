/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block (it may be nested inside wrappers)
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Find the image: <picture> (preferred), or <img>
  let imageEl = null;
  let picture = heroBlock.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    let img = heroBlock.querySelector('img');
    if (img) imageEl = img;
  }

  // Find all headings and paragraphs, but skip image wrappers
  const contentEls = [];
  heroBlock.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a').forEach((el) => {
    // Exclude the <p> that wraps the <picture>
    if (el.tagName.toLowerCase() === 'p' && el.querySelector('picture')) return;
    // Exclude empty paragraphs
    if (el.tagName.toLowerCase() === 'p' && !el.textContent.trim()) return;
    contentEls.push(el);
  });

  // Create table rows according to the block definition
  const rows = [];
  rows.push(['Hero']); // Header row
  rows.push([imageEl ? imageEl : '']);
  rows.push([contentEls.length > 0 ? contentEls : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
