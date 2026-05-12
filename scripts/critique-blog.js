const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('=== CRITIQUE: codebar Blog ===\n');
  
  // Navigate to blog
  await page.goto('http://localhost:1313/', { waitUntil: 'networkidle' });
  
  // Set page title for identification
  await page.evaluate(() => {
    document.title = '[Critique] ' + document.title;
  });
  
  // Get page info
  const title = await page.title();
  const heading = await page.locator('h1').first().textContent();
  console.log('Page Title:', title);
  console.log('Primary Heading:', heading.trim());
  console.log('');
  
  // AI Slop Detection Checklist
  console.log('=== AI Slop Detection ===');
  const checks = await page.evaluate(() => {
    const results = {};
    
    // Check for gradient text
    const allElements = document.querySelectorAll('*');
    results.gradientText = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      return style.backgroundClip === 'text' || style.webkitBackgroundClip === 'text';
    });
    
    // Check for glassmorphism
    results.glassmorphism = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter !== 'none' && style.backdropFilter !== '';
    });
    
    // Check for dark glows/shadows
    results.darkGlows = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      const shadow = style.boxShadow;
      return shadow.includes('rgb(0, 0, 0)') && (shadow.includes('20px') || shadow.includes('30px') || shadow.includes('40px'));
    });
    
    // Check for identical card grids
    const cards = document.querySelectorAll('.card, [class*="card"]');
    results.cardCount = cards.length;
    
    // Check for hero metrics layout
    const bigNumbers = document.querySelectorAll('[class*="metric"], [class*="stat"], [class*="number"]');
    results.heroMetrics = bigNumbers.length;
    
    // Check font families
    const bodyFont = window.getComputedStyle(document.body).fontFamily;
    results.fontFamily = bodyFont;
    results.genericFont = bodyFont.includes('Inter') || bodyFont.includes('system-ui') || bodyFont.includes('sans-serif');
    
    // Check for side-stripe borders
    results.sideStripes = Array.from(allElements).some(el => {
      const style = window.getComputedStyle(el);
      const leftBorder = parseInt(style.borderLeftWidth);
      const rightBorder = parseInt(style.borderRightWidth);
      return leftBorder > 1 || rightBorder > 1;
    });
    
    return results;
  });
  
  console.log('Gradient text detected:', checks.gradientText ? 'YES ⚠️' : 'No ✓');
  console.log('Glassmorphism detected:', checks.glassmorphism ? 'YES ⚠️' : 'No ✓');
  console.log('Heavy dark shadows:', checks.darkGlows ? 'YES ⚠️' : 'No ✓');
  console.log('Card elements found:', checks.cardCount);
  console.log('Hero metric elements:', checks.heroMetrics);
  console.log('Side-stripe borders:', checks.sideStripes ? 'YES ⚠️' : 'No ✓');
  console.log('Font family:', checks.fontFamily);
  console.log('');
  
  // Visual Hierarchy Analysis
  console.log('=== Visual Hierarchy ===');
  const hierarchy = await page.evaluate(() => {
    const h1s = document.querySelectorAll('h1');
    const h2s = document.querySelectorAll('h2');
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button, .button');
    const images = document.querySelectorAll('img');
    
    return {
      h1Count: h1s.length,
      h2Count: h2s.length,
      linkCount: links.length,
      buttonCount: buttons.length,
      imageCount: images.length
    };
  });
  
  console.log('H1 elements:', hierarchy.h1Count);
  console.log('H2 elements:', hierarchy.h2Count);
  console.log('Total links:', hierarchy.linkCount);
  console.log('Buttons:', hierarchy.buttonCount);
  console.log('Images:', hierarchy.imageCount);
  console.log('');
  
  // Accessibility Checks
  console.log('=== Accessibility ===');
  const a11y = await page.evaluate(() => {
    // Check for skip link
    const skipLink = document.querySelector('.skip-link, [href^="#main"]');
    
    // Check for alt text on images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt && !img.getAttribute('aria-label'));
    
    // Check for focusable elements
    const focusables = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    // Check for semantic landmarks
    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    // Check color contrast on body text
    const bodyStyle = window.getComputedStyle(document.body);
    const bodyColor = bodyStyle.color;
    const bgColor = bodyStyle.backgroundColor;
    
    return {
      hasSkipLink: !!skipLink,
      totalImages: images.length,
      imagesWithoutAlt: imagesWithoutAlt.length,
      focusableElements: focusables.length,
      hasMain: !!main,
      hasNav: !!nav,
      hasHeader: !!header,
      hasFooter: !!footer,
      bodyColor,
      bgColor
    };
  });
  
  console.log('Skip link present:', a11y.hasSkipLink ? 'Yes ✓' : 'No ⚠️');
  console.log('Images without alt:', a11y.imagesWithoutAlt, a11y.imagesWithoutAlt > 0 ? '⚠️' : '✓');
  console.log('Focusable elements:', a11y.focusableElements);
  console.log('Semantic landmarks:', 
    (a11y.hasMain ? 'main ' : '') + 
    (a11y.hasNav ? 'nav ' : '') + 
    (a11y.hasHeader ? 'header ' : '') + 
    (a11y.hasFooter ? 'footer' : '')
  );
  console.log('');
  
  // Performance/Layout Checks
  console.log('=== Layout & Spacing ===');
  const layout = await page.evaluate(() => {
    // Check container width
    const container = document.querySelector('.container');
    const containerWidth = container ? container.getBoundingClientRect().width : 0;
    
    // Check body margins
    const bodyStyle = window.getComputedStyle(document.body);
    
    // Count distinct spacing values
    const allElements = document.querySelectorAll('*');
    const margins = new Set();
    const paddings = new Set();
    
    Array.from(allElements).slice(0, 100).forEach(el => {
      const style = window.getComputedStyle(el);
      margins.add(style.marginTop);
      paddings.add(style.paddingTop);
    });
    
    return {
      containerWidth: Math.round(containerWidth),
      distinctMargins: margins.size,
      distinctPaddings: paddings.size
    };
  });
  
  console.log('Container width:', layout.containerWidth + 'px');
  console.log('Distinct margin values:', layout.distinctMargins);
  console.log('Distinct padding values:', layout.distinctPaddings);
  console.log('');
  
  // Take full page screenshot
  await page.screenshot({ path: 'critique-fullpage.png', fullPage: true });
  console.log('Full page screenshot saved to critique-fullpage.png');
  
  await browser.close();
  console.log('\n=== Critique Complete ===');
})();
