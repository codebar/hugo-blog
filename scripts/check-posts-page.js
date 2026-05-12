const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/posts/', { waitUntil: 'networkidle' });
  
  const posts = await page.evaluate(() => {
    const items = document.querySelectorAll('.post-list-item');
    return Array.from(items).slice(0, 3).map(item => {
      return {
        title: item.querySelector('h2')?.textContent?.trim() || '',
        meta: item.querySelector('.post-list-meta')?.textContent?.trim() || '',
        excerpt: item.querySelector('.post-list-excerpt')?.textContent?.trim() || ''
      };
    });
  });
  
  console.log('Posts page format:');
  posts.forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.title}`);
    console.log(`   Meta: ${p.meta}`);
    console.log(`   Excerpt: ${p.excerpt?.substring(0, 80)}...`);
  });
  
  await browser.close();
})();
