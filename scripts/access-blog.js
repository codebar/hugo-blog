const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:1313/...');
  const response = await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  console.log('Status:', response.status());
  console.log('Title:', await page.title());
  
  const heading = await page.locator('h1').first().textContent().catch(() => 'No h1 found');
  console.log('First h1:', heading.trim());
  
  const links = await page.locator('a').count();
  console.log('Total links on page:', links);
  
  await page.screenshot({ path: 'blog-homepage.png', fullPage: true });
  console.log('Screenshot saved to blog-homepage.png');
  
  await browser.close();
  console.log('Done!');
})();
