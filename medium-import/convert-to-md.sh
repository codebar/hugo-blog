#!/bin/bash

# Convert HTML content in Medium posts to Markdown using markitdown
export PATH="/Users/morgan/.local/bin:$PATH"

for file in ../content/posts/202*.md ../content/posts/10-*.md ../content/posts/codebar-*.md ../content/posts/the-*.md ../content/posts/we-*.md ../content/posts/where-*.md; do
    if [ -f "$file" ]; then
        echo "Processing: $(basename $file)"
        
        # Extract frontmatter (between first and second ---)
        awk '/^---$/{if(++count<=2)print;next}count<=2' "$file" > /tmp/frontmatter.txt
        
        # Extract content (everything after second ---)
        awk '/^---$/{count++; if(count==2){found=1;next}}found' "$file" > /tmp/content.html
        
        # Convert HTML to Markdown
        if [ -s /tmp/content.html ]; then
            markdown=$(markitdown /tmp/content.html 2>/dev/null)
            
            # Write new file
            cat /tmp/frontmatter.txt > "$file"
            echo "" >> "$file"
            echo "$markdown" >> "$file"
            echo "  ✓ Converted"
        else
            echo "  ⚠ No content found"
        fi
    fi
done

rm -f /tmp/frontmatter.txt /tmp/content.html test.html
echo "Done!"
