const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  console.log('=== Checking More Posts Section ===\n');
  
  const posts = await page.evaluate(() => {
    const items = document.querySelectorAll('.recent-posts .post-list-item');
    return Array.from(items).slice(0, 3).map(item => {
      return {
        title: item.querySelector('h3')?.textContent?.trim() || '',
        meta: item.querySelector('.post-list-meta')?.textContent?.replace(/\s+/g, ' ').trim() || '',
        hasExcerpt: !!item.querySelector('.post-list-excerpt'),
        excerpt: item.querySelector('.post-list-excerpt')?.textContent?.trim() || ''
      };
    });
  });
  
  console.log('Recent posts with excerpts:');
  posts.forEach((p, i) => {
    console.log(`\n${i + 1}. ${p.title}`);
    console.log(`   Meta: ${p.meta.substring(0, 80)}...`);
    console.log(`   Has excerpt: ${p.hasExcerpt ? '✓' : '✗'}`);
    if (p.hasExcerpt) {
      console.log(`   Excerpt: ${p.excerpt.substring(0, 100)}...`);
    }
  });
  
  await page.screenshot({ path: 'homepage-more-posts.png', fullPage: true });
  console.log('\n✓ Screenshot saved to homepage-more-posts.png');
  
  await browser.close();
})();
