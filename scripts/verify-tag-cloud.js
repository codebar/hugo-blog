const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== Verifying Tag Cloud Changes ===\n');
  
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  // Check 1: Count visible tags
  console.log('1. Counting visible tags...');
  const visibleTags = await page.locator('.tag-cloud > .tag-cloud-item').count();
  const collapsedTags = await page.locator('#tag-cloud-more .tag-cloud-item').count();
  console.log('   Visible tags:', visibleTags);
  console.log('   Collapsed tags:', collapsedTags);
  console.log('   Total tags:', visibleTags + collapsedTags);
  
  // Check 2: Verify tag counts are displayed
  console.log('\n2. Checking tag counts...');
  const firstTagCount = await page.locator('.tag-cloud-item .tag-count').first().textContent();
  console.log('   First tag count:', firstTagCount);
  
  // Check 3: Check toggle button
  console.log('\n3. Checking toggle button...');
  const toggle = page.locator('#tag-toggle');
  const hasToggle = await toggle.count() > 0;
  console.log('   Toggle button:', hasToggle ? '✓ Present' : '✗ Missing');
  
  if (hasToggle) {
    const toggleText = await toggle.textContent();
    const ariaExpanded = await toggle.getAttribute('aria-expanded');
    console.log('   Toggle text:', toggleText.trim());
    console.log('   Aria expanded:', ariaExpanded);
    
    // Click to expand
    console.log('\n4. Testing expand/collapse...');
    await toggle.click();
    await page.waitForTimeout(300);
    
    const isExpanded = await toggle.getAttribute('aria-expanded');
    const newToggleText = await toggle.textContent();
    const visibleAfterExpand = await page.locator('.tag-cloud-item').count();
    
    console.log('   After click - aria-expanded:', isExpanded);
    console.log('   After click - toggle text:', newToggleText.trim());
    console.log('   Total visible tags after expand:', visibleAfterExpand);
    
    // Click to collapse
    await toggle.click();
    await page.waitForTimeout(300);
    
    const afterCollapse = await toggle.getAttribute('aria-expanded');
    console.log('   After second click - aria-expanded:', afterCollapse);
  }
  
  // Check 5: Verify popular tags are shown first (sorted by count)
  console.log('\n5. Checking tag popularity sorting...');
  const tagCounts = await page.locator('.tag-cloud > .tag-cloud-item .tag-count').allTextContents();
  const counts = tagCounts.map(c => parseInt(c)).slice(0, 5);
  console.log('   First 5 tag counts:', counts);
  const isSorted = counts.every((val, i, arr) => !i || arr[i-1] >= val);
  console.log('   Sorted by popularity:', isSorted ? '✓ Yes' : '✗ No');
  
  // Screenshot
  await page.screenshot({ path: 'verify-tag-cloud.png', fullPage: true });
  console.log('\n✓ Screenshot saved');
  
  await browser.close();
  console.log('\n=== Verification Complete ===');
})();
