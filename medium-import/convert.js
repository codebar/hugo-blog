#!/usr/bin/env node
const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

// Read the RSS feed
const feedXml = fs.readFileSync('./feed.xml', 'utf8');

// Parse XML
const parser = new xml2js.Parser({ explicitArray: false });
parser.parseString(feedXml, (err, result) => {
  if (err) {
    console.error('Error parsing XML:', err);
    process.exit(1);
  }

  const items = result.rss.channel.item;
  const posts = Array.isArray(items) ? items : [items];

  console.log(`Found ${posts.length} posts to convert\n`);

  posts.forEach((post, index) => {
    const title = post.title.replace(/^<!\[CDATA\[|\]\]>$/g, '').trim();
    const date = new Date(post.pubDate);
    const isoDate = date.toISOString();
    const content = post['content:encoded']?.replace(/^<!\[CDATA\[|\]\]>$/g, '') || '';
    const link = post.link;
    const creator = post['dc:creator']?.replace(/^<!\[CDATA\[|\]\]>$/g, '') || 'codebar';
    
    // Extract categories/tags
    let categories = [];
    if (post.category) {
      categories = Array.isArray(post.category) 
        ? post.category.map(c => c.replace(/^<!\[CDATA\[|\]\]>$/g, ''))
        : [post.category.replace(/^<!\[CDATA\[|\]\]>$/g, '')];
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50);

    // Extract summary (first 200 chars of text content, stripped of HTML)
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const summary = textContent.substring(0, 200).replace(/\s+$/, '') + (textContent.length > 200 ? '...' : '');

    // Frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${isoDate}
author: "${creator}"
tags: [${categories.map(c => `"${c}"`).join(', ')}]
summary: "${summary.replace(/"/g, '\\"')}"
original_url: "${link}"
---

`;

    // Write file
    const filename = `../content/posts/${slug}.md`;
    const fileContent = frontmatter + content;
    
    // Check if file already exists
    if (fs.existsSync(filename)) {
      console.log(`⚠️  Skipping (exists): ${title}`);
      return;
    }

    fs.writeFileSync(filename, fileContent);
    console.log(`✅ Created: ${filename}`);
    console.log(`   Title: ${title}`);
    console.log(`   Date: ${isoDate.split('T')[0]}`);
    console.log(`   Tags: ${categories.join(', ') || 'none'}\n`);
  });

  console.log('Done!');
});
