const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Verifying Tags Page ===\n');
  
  await page.goto('http://localhost:1313/tags/', { waitUntil: 'networkidle' });
  
  // Check structure
  console.log('1. Page structure:');
  const structure = await page.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.textContent?.trim() || 'No h1',
      intro: document.querySelector('.list-page-intro')?.textContent?.trim() || 'No intro',
      popularSection: !!document.querySelector('[aria-labelledby="popular-tags-heading"]'),
      allSection: !!document.querySelector('[aria-labelledby="all-tags-heading"]'),
      alphaSection: !!document.querySelector('[aria-labelledby="alphabetical-heading"]')
    };
  });
  console.log('   H1:', structure.h1);
  console.log('   Intro:', structure.intro.substring(0, 60) + '...');
  console.log('   Popular section:', structure.popularSection ? '✓' : '✗');
  console.log('   All topics section:', structure.allSection ? '✓' : '✗');
  console.log('   Alphabetical section:', structure.alphaSection ? '✓' : '✗');
  
  // Check tags
  console.log('\n2. Tags:');
  const tags = await page.evaluate(() => {
    const popular = document.querySelectorAll('.tags-cloud-large .tag');
    const all = document.querySelectorAll('.tags-cloud-compact .tag');
    const alpha = document.querySelectorAll('.tags-alpha-nav .tag');
    
    return {
      popularCount: popular.length,
      allCount: all.length,
      alphaCount: alpha.length,
      firstPopular: popular[0]?.textContent?.trim() || 'None',
      hasBadges: document.querySelectorAll('.tag-badge').length > 0
    };
  });
  console.log('   Popular tags:', tags.popularCount);
  console.log('   All tags:', tags.allCount);
  console.log('   Alphabetical tags:', tags.alphaCount);
  console.log('   First popular:', tags.firstPopular);
  console.log('   Has count badges:', tags.hasBadges ? '✓' : '✗');
  
  // Check sorting by popularity
  console.log('\n3. Popularity sorting:');
  const popularCounts = await page.locator('.tags-cloud-large .tag-badge').allTextContents();
  const counts = popularCounts.slice(0, 5).map(c => parseInt(c));
  console.log('   First 5 counts:', counts);
  const isSorted = counts.every((val, i, arr) => !i || arr[i-1] >= val);
  console.log('   Sorted by popularity:', isSorted ? '✓ Yes' : '✗ No');
  
  // Test clicking a tag
  console.log('\n4. Testing tag navigation:');
  const firstTag = page.locator('.tags-cloud-large .tag').first();
  const tagHref = await firstTag.getAttribute('href');
  console.log('   First tag href:', tagHref);
  
  await firstTag.click();
  await page.waitForLoadState('networkidle');
  const newTitle = await page.title();
  console.log('   After click, title:', newTitle);
  
  await page.screenshot({ path: 'tags-page-improved.png', fullPage: true });
  console.log('\n✓ Screenshot saved');
  
  await browser.close();
  console.log('\n=== Verification Complete ===');
})();
