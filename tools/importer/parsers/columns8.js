/* global WebImporter */
export default function parse(element, { document }) {
  // COLUMN 1: Navigation links as <ul> + first social button
  let navList = null;
  const nav = element.querySelector('.cmp-navigation');
  if (nav) {
    const navGroup = nav.querySelector('.cmp-navigation__group');
    if (navGroup) {
      navList = document.createElement('ul');
      navGroup.querySelectorAll(':scope > li > a').forEach(a => {
        const li = document.createElement('li');
        li.textContent = a.textContent.trim();
        navList.appendChild(li);
      });
    }
  }
  // First social button
  let firstButton = null;
  const btnListBlock = element.querySelector('.cmp-buildingblock--btn-list');
  if (btnListBlock) {
    const firstButtonDiv = btnListBlock.querySelector('.cmp-button');
    if (firstButtonDiv) firstButton = firstButtonDiv;
  }
  let col1 = null;
  if (navList && firstButton) {
    const wrap = document.createElement('div');
    wrap.appendChild(navList);
    wrap.appendChild(firstButton);
    col1 = wrap;
  } else if (navList) {
    col1 = navList;
  } else if (firstButton) {
    col1 = firstButton;
  }

  // COLUMN 2: Logo image only
  let col2 = null;
  const logoBlock = element.querySelector('.cmp-image');
  if (logoBlock) {
    const img = logoBlock.querySelector('img');
    if (img) {
      col2 = img;
    } else {
      col2 = logoBlock;
    }
  }

  // COLUMN 3: Copyright text + Follow Us title + remaining social buttons
  const copyright = element.querySelector('.cmp-text');
  const followTitle = element.querySelector('.cmp-title');
  let restButtons = [];
  if (btnListBlock) {
    const buttonLinks = btnListBlock.querySelectorAll('.cmp-button');
    restButtons = Array.from(buttonLinks).slice(1); // skip first for col1
  }
  let col3 = null;
  if (copyright || followTitle || restButtons.length) {
    const wrap = document.createElement('div');
    if (copyright) wrap.appendChild(copyright);
    if (followTitle) wrap.appendChild(followTitle);
    restButtons.forEach(btn => wrap.appendChild(btn));
    col3 = wrap;
  }

  // Compose the table: header row, then one content row (3 columns)
  const cells = [
    ['Columns (columns8)'],
    [col1, col2, col3]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
