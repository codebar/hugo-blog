const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== CRITIQUE: codebar Blog (Updated) ===\n');
  
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  // AI Slop Detection
  console.log('=== AI Slop Detection ===');
  const checks = await page.evaluate(() => {
    const results = {};
    const allElements = document.querySelectorAll('*');
    
    results.gradientText = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      return style.backgroundClip === 'text' || style.webkitBackgroundClip === 'text';
    });
    
    results.glassmorphism = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter !== 'none' && style.backdropFilter !== '';
    });
    
    results.darkGlows = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      const shadow = style.boxShadow;
      return shadow.includes('rgb(0, 0, 0)') && (shadow.includes('20px') || shadow.includes('30px') || shadow.includes('40px'));
    });
    
    results.sideStripes = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      const leftBorder = parseInt(style.borderLeftWidth);
      const rightBorder = parseInt(style.borderRightWidth);
      return leftBorder > 1 || rightBorder > 1;
    });
    
    const cards = document.querySelectorAll('.card');
    results.cardCount = cards.length;
    
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    results.fontFamily = bodyFont;
    
    return results;
  });
  
  console.log('Gradient text:', checks.gradientText ? 'YES ⚠️' : 'No ✓');
  console.log('Glassmorphism:', checks.glassmorphism ? 'YES ⚠️' : 'No ✓');
  console.log('Heavy dark shadows:', checks.darkGlows ? 'YES ⚠️' : 'No ✓');
  console.log('Side-stripe borders:', checks.sideStripes ? 'YES ⚠️' : 'No ✓');
  console.log('Cards:', checks.cardCount);
  console.log('Font:', checks.fontFamily);
  console.log('');
  
  // Visual Hierarchy
  console.log('=== Visual Hierarchy ===');
  const hierarchy = await page.evaluate(() => {
    return {
      h1: document.querySelectorAll('h1').length,
      h2: document.querySelectorAll('h2').length,
      links: document.querySelectorAll('a').count,
      buttons: document.querySelectorAll('button, .button').length,
      images: document.querySelectorAll('img').length,
      tags: document.querySelectorAll('.tag').length
    };
  });
  console.log('H1:', hierarchy.h1);
  console.log('H2:', hierarchy.h2);
  console.log('Links:', hierarchy.links);
  console.log('Buttons:', hierarchy.buttons);
  console.log('Images:', hierarchy.images);
  console.log('Total tags:', hierarchy.tags);
  console.log('');
  
  // New Features Check
  console.log('=== New Features ===');
  const features = await page.evaluate(() => {
    const fullContent = document.querySelector('.featured-post-content-full');
    const tagFilter = document.querySelector('.tag-filter');
    const tagCloud = document.querySelectorAll('.tag-cloud .tag');
    const featuredTags = document.querySelectorAll('.featured-post-tags .tag');
    
    return {
      hasFullContent: !!fullContent,
      contentLength: fullContent ? fullContent.textContent.length : 0,
      hasTagFilter: !!tagFilter,
      tagCloudCount: tagCloud.length,
      featuredTagsCount: featuredTags.length
    };
  });
  
  console.log('Full content:', features.hasFullContent ? '✓ Present' : '✗ Missing');
  console.log('Content length:', features.contentLength, 'chars');
  console.log('Tag filter:', features.hasTagFilter ? '✓ Present' : '✗ Missing');
  console.log('Tag cloud:', features.tagCloudCount, 'tags');
  console.log('Featured post tags:', features.featuredTagsCount, 'tags');
  console.log('');
  
  // Accessibility
  console.log('=== Accessibility ===');
  const a11y = await page.evaluate(() => {
    return {
      skipLink: !!document.querySelector('.skip-link'),
      mainLandmark: !!document.querySelector('main'),
      navLandmark: !!document.querySelector('nav'),
      headerLandmark: !!document.querySelector('header'),
      footerLandmark: !!document.querySelector('footer'),
      imagesWithoutAlt: Array.from(document.querySelectorAll('img')).filter(img => !img.alt).length
    };
  });
  
  console.log('Skip link:', a11y.skipLink ? '✓' : '⚠️');
  console.log('Landmarks:', [a11y.mainLandmark && 'main', a11y.navLandmark && 'nav', a11y.headerLandmark && 'header', a11y.footerLandmark && 'footer'].filter(Boolean).join(', '));
  console.log('Images without alt:', a11y.imagesWithoutAlt);
  console.log('');
  
  // Cognitive Load Check
  console.log('=== Cognitive Load ===');
  const cognitive = await page.evaluate(() => {
    const tagCloud = document.querySelectorAll('.tag-cloud .tag');
    return {
      tagCount: tagCloud.length,
      optionsAtOnce: tagCloud.length // All tags visible at once
    };
  });
  console.log('Total tags visible:', cognitive.tagCount);
  console.log('This is', cognitive.tagCount > 20 ? 'HIGH' : cognitive.tagCount > 10 ? 'MODERATE' : 'LOW', 'cognitive load for tag browsing');
  console.log('');
  
  await page.screenshot({ path: 'critique-updated.png', fullPage: true });
  console.log('Screenshot saved to critique-updated.png');
  
  await browser.close();
  console.log('\n=== Critique Complete ===');
})();
