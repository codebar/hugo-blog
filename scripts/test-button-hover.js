const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  // Find the "View all posts" button
  const button = page.locator('.archive-link .button-primary');
  
  // Get default state
  const defaultColor = await button.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.color;
  });
  
  // Hover over the button
  await button.hover();
  await page.waitForTimeout(100);
  
  // Get hover state
  const hoverColor = await button.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.color;
  });
  
  const hoverBg = await button.evaluate(el => {
    const style = window.getComputedStyle(el);
    return style.backgroundColor;
  });
  
  console.log('Button text color:');
  console.log('  Default:', defaultColor);
  console.log('  Hover:', hoverColor);
  console.log('  Hover background:', hoverBg);
  
  // Check if text is visible (color should be white/light)
  const isVisible = hoverColor.includes('255') || hoverColor.includes('100%');
  console.log('\nText visible on hover:', isVisible ? '✓ Yes' : '✗ No (BUG!)');
  
  // Screenshot with hover state
  await button.hover();
  await page.screenshot({ path: 'button-hover-test.png' });
  console.log('\nScreenshot saved to button-hover-test.png');
  
  await browser.close();
})();
