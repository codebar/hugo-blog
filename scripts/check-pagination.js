const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/posts/', { waitUntil: 'networkidle' });
  
  const posts = await page.locator('.post-list-item').count();
  const pagination = await page.locator('.pagination').count();
  const pageInfo = await page.locator('.pagination-info').textContent().catch(() => 'No pagination');
  
  console.log('Posts per page:', posts);
  console.log('Has pagination:', pagination > 0 ? 'Yes' : 'No');
  if (pagination > 0) {
    console.log('Pagination info:', pageInfo);
  }
  
  await browser.close();
})();
