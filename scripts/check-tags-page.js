const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Checking Tags Page ===\n');
  
  await page.goto('http://localhost:1313/tags/', { waitUntil: 'networkidle' });
  
  // Get page info
  const title = await page.title();
  console.log('Page Title:', title);
  
  // Check structure
  const structure = await page.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.textContent?.trim() || 'No h1',
      tagLinks: document.querySelectorAll('a[href*="/tags/"]').length,
      totalLinks: document.querySelectorAll('a').length,
      listItems: document.querySelectorAll('li').length,
      hasList: !!document.querySelector('ul, ol')
    };
  });
  
  console.log('H1:', structure.h1);
  console.log('Tag links:', structure.tagLinks);
  console.log('Total links:', structure.totalLinks);
  console.log('List items:', structure.listItems);
  console.log('Has list:', structure.hasList ? 'Yes' : 'No');
  
  // Get all tag names and counts if available
  const tagsInfo = await page.evaluate(() => {
    const items = document.querySelectorAll('li');
    const tags = [];
    items.forEach((item, i) => {
      if (i < 10) { // First 10 only
        const link = item.querySelector('a');
        if (link) {
          tags.push({
            text: link.textContent.trim(),
            href: link.getAttribute('href')
          });
        }
      }
    });
    return tags;
  });
  
  console.log('\nFirst 10 tags:');
  tagsInfo.forEach(t => console.log('  -', t.text));
  
  await page.screenshot({ path: 'tags-page-current.png', fullPage: true });
  console.log('\nScreenshot saved to tags-page-current.png');
  
  await browser.close();
})();
