const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Verifying Changes ===\n');
  
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  // Check 1: Featured post has full content (not just excerpt)
  console.log('1. Checking featured post content...');
  const fullContent = await page.locator('.featured-post-content-full').count();
  const excerptOnly = await page.locator('.featured-post-excerpt').count();
  console.log('   Full content section:', fullContent > 0 ? '✓ Present' : '✗ Missing');
  console.log('   Excerpt section:', excerptOnly > 0 ? '✗ Still using excerpts' : '✓ Removed');
  
  // Check if content is longer than typical excerpt
  const contentLength = await page.locator('.featured-post-content-full').textContent().catch(() => '');
  console.log('   Content length:', contentLength.length, 'chars');
  
  // Check 2: Tags on featured post
  console.log('\n2. Checking featured post tags...');
  const featuredTags = await page.locator('.featured-post-tags .tag').count();
  console.log('   Tags on featured post:', featuredTags);
  
  // Check 3: Tag filter section
  console.log('\n3. Checking tag filter section...');
  const tagFilter = await page.locator('.tag-filter').count();
  const tagCloud = await page.locator('.tag-cloud .tag').count();
  console.log('   Tag filter section:', tagFilter > 0 ? '✓ Present' : '✗ Missing');
  console.log('   Tags in cloud:', tagCloud);
  
  // Check 4: Verify tag links work
  console.log('\n4. Verifying tag links...');
  const firstTag = page.locator('.tag-cloud .tag').first();
  if (await firstTag.count() > 0) {
    const tagHref = await firstTag.getAttribute('href');
    console.log('   First tag href:', tagHref);
    
    // Navigate to first tag page
    await firstTag.click();
    await page.waitForLoadState('networkidle');
    const tagPageTitle = await page.title();
    console.log('   Tag page title:', tagPageTitle);
    
    // Go back
    await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  }
  
  // Take screenshot
  await page.screenshot({ path: 'verify-changes.png', fullPage: true });
  console.log('\n✓ Screenshot saved to verify-changes.png');
  
  await browser.close();
  console.log('\n=== Verification Complete ===');
})();
