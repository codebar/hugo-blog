const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/tags/', { waitUntil: 'networkidle' });
  
  await page.screenshot({ path: 'tags-list-page.png', fullPage: true });
  console.log('Screenshot of tags list page saved');
  
  await browser.close();
})();
