/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing all cards within the block
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Build header row
  const tableRows = [['Cards']];

  // Each card is an <li>
  Array.from(ul.children).forEach(li => {
    // Get image: Prefer <picture>, fallback to <img>
    let imgCell = '';
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      const pic = imgWrapper.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        const img = imgWrapper.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Get all text content from body, preserving strong formatting for headings
    const bodyWrapper = li.querySelector('.cards-card-body');
    let textCell;
    if (bodyWrapper) {
      // Get all <p> elements as nodes, preserving order
      const ps = Array.from(bodyWrapper.querySelectorAll('p'));
      if (ps.length > 0) {
        textCell = ps.length === 1 ? ps[0] : ps;
      } else {
        textCell = bodyWrapper; // fallback: all text
      }
    } else {
      textCell = '';
    }

    tableRows.push([imgCell, textCell]);
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
