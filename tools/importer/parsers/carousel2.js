/* global WebImporter */
export default function parse(element, { document }) {
  // Find carousel block
  const carousel = element.querySelector('.cmp-carousel');
  if (!carousel) return;
  const content = carousel.querySelector('.cmp-carousel__content');
  if (!content) return;
  // Extract slides
  const slides = Array.from(content.querySelectorAll(':scope > .cmp-carousel__item'));
  // Table rows: header row MUST be single cell 'Carousel', then each slide as [image, text]
  const rows = [['Carousel']];
  slides.forEach((slide) => {
    // 1st column: image element
    let imageEl = null;
    const imgWrap = slide.querySelector('.cmp-teaser__image .cmp-image');
    if (imgWrap) {
      // Use the direct <img> child, reference NOT clone
      imageEl = imgWrap.querySelector('img');
    }
    // 2nd column: text content block
    const contentEl = slide.querySelector('.cmp-teaser__content');
    let textCell = '';
    if (contentEl) {
      const frag = document.createElement('div');
      // Title (heading)
      const titleEl = contentEl.querySelector('.cmp-teaser__title');
      if (titleEl) {
        // Use heading (but use <h2> for semantic match)
        const h2 = document.createElement('h2');
        h2.textContent = titleEl.textContent.trim();
        frag.appendChild(h2);
      }
      // Description
      const descEl = contentEl.querySelector('.cmp-teaser__description');
      if (descEl) {
        // If the description is wrapped in <p> or in text
        if (descEl.childNodes.length === 1 && descEl.childNodes[0].nodeType === 1 && descEl.childNodes[0].tagName === 'P') {
          frag.appendChild(descEl.childNodes[0]);
        } else {
          // Just wrap text in <p>
          const txt = descEl.textContent.trim();
          if (txt.length > 0) {
            const p = document.createElement('p');
            p.textContent = txt;
            frag.appendChild(p);
          }
        }
      }
      // CTA
      const ctaEl = contentEl.querySelector('.cmp-teaser__action-link');
      if (ctaEl) {
        frag.appendChild(ctaEl);
      }
      // Only fill cell if we have content
      textCell = frag.childNodes.length > 0 ? frag : '';
    }
    // Add slide row: [image, text]
    rows.push([imageEl, textCell]);
  });
  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
