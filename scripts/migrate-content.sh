#!/bin/bash
set -e

JEKYLL_SOURCE="../blog/source/_posts"
HUGO_CONTENT="content/posts"
MAPPING_FILE="url-mapping.txt"
OCTOPRESS_REPORT="octopress-manual-cleanup.txt"

# Clean up existing content
rm -rf "$HUGO_CONTENT"
mkdir -p "$HUGO_CONTENT"

# Clear mapping file and reports
> "$MAPPING_FILE"
> "$OCTOPRESS_REPORT"

# Process each Jekyll post
for jekyll_file in "$JEKYLL_SOURCE"/*.markdown; do
    if [ ! -f "$jekyll_file" ]; then
        continue
    fi
    
    # Extract filename components
    filename=$(basename "$jekyll_file")
    # YYYY-MM-DD-slug.markdown → extract date and slug
    if [[ $filename =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})-(.+)\.markdown$ ]]; then
        year="${BASH_REMATCH[1]}"
        month="${BASH_REMATCH[2]}"
        day="${BASH_REMATCH[3]}"
        slug="${BASH_REMATCH[4]}"
        
        # Check for Octopress tags that need manual cleanup
        if grep -q "{% img \|{% codeblock \|{% blockquote \|{% include " "$jekyll_file"; then
            echo "$filename" >> "$OCTOPRESS_REPORT"
            echo "  ⚠ Contains Octopress tags - requires manual cleanup" >> "$OCTOPRESS_REPORT"
        fi
        
        # Create output file with transformed content
        output_file="$HUGO_CONTENT/${slug}.md"
        
        # Read the file and process frontmatter
        awk -v y="$year" -v m="$month" -v d="$day" -v slug="$slug" '
            BEGIN { 
                in_frontmatter=0; 
                printed_date=0;
                frontmatter_line=0;
            }
            /^---$/ { 
                frontmatter_line++
                if (frontmatter_line == 1) {
                    in_frontmatter=1
                    print
                    next
                } else if (frontmatter_line == 2) {
                    # End of frontmatter - add date if not already present
                    if (!printed_date) {
                        printf "date: %s-%s-%sT00:00:00Z\n", y, m, d
                    }
                    print
                    in_frontmatter=0
                    next
                }
            }
            in_frontmatter {
                # Inside frontmatter - transform fields
                if (/^layout:/) { next }  # Skip layout field
                if (/^date:/) { 
                    # Convert date format: "2015-02-22 15:19:28 +0000" → "2015-02-22T15:19:28Z"
                    if (match($0, /date: ([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/, arr)) {
                        printf "date: %s-%s-%sT%s:%s:%sZ\n", arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]
                    } else {
                        # Fallback: use date from filename
                        printf "date: %s-%s-%sT00:00:00Z\n", y, m, d
                    }
                    printed_date=1
                    next
                }
                if (/^categories:/) {
                    # Convert categories to tags
                    # Handle: categories: london trans-code → tags: ["london", "trans-code"]
                    gsub(/^categories: /, "")
                    # Split by spaces, create array
                    n = split($0, cats, " ")
                    printf "tags: ["
                    for (i = 1; i <= n; i++) {
                        if (i > 1) printf ", "
                        printf "\"%s\"", cats[i]
                    }
                    printf "]\n"
                    next
                }
                if (/^comments:/) {
                    # Preserve comments field for potential Disqus integration
                    print
                    next
                }
                if (/^author:/) {
                    # Keep author field
                    print
                    next
                }
                # Pass through other frontmatter fields
                print
                next
            }
            # Content body - pass through unchanged
            { print }
        ' "$jekyll_file" > "$output_file"
        
        # Add to URL mapping (use pattern from audit: /:year/:month/:day/:title/)
        echo "/${year}/${month}/${day}/${slug}/ /posts/${slug}/ 301" >> "$MAPPING_FILE"
        
        echo "✓ Migrated: $filename → ${slug}.md"
    else
        echo "✗ Skipped (unrecognized format): $filename"
    fi
done

echo ""
echo "Migration complete!"
echo "Posts: $(ls -1 $HUGO_CONTENT/*.md 2>/dev/null | wc -l)"
echo "Mapping file: $MAPPING_FILE"
if [ -s "$OCTOPRESS_REPORT" ]; then
    echo "⚠ Posts needing manual cleanup: $(wc -l < "$OCTOPRESS_REPORT")"
    echo "See: $OCTOPRESS_REPORT"
fi
