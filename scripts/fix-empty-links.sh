#!/bin/bash
# Fix empty link wrappers around images
# Pattern: [![alt](/images/img.jpg)]() -> ![alt](/images/img.jpg)

for file in content/posts/*.md; do
    # Use sed to remove empty link wrappers
    # Match: [![alt](/images/...)]() -> ![alt](/images/...)
    sed -i '' 's/\[\!\[\([^]]*\)\](\([^)]*\))\]()$/![\1](\2)/g' "$file"
    echo "✓ Fixed: $file"
done

echo ""
echo "Done! Verifying..."
awk '/\]\(\)$/{print FILENAME": "$0}' content/posts/*.md | wc -l
echo "remaining empty links (should be 0)"
