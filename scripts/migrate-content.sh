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
        
        # Create output file
        output_file="$HUGO_CONTENT/${slug}.md"
        
        # Process file line by line
        in_frontmatter=0
        frontmatter_line=0
        printed_date=0
        
        while IFS= read -r line || [ -n "$line" ]; do
            # Check for frontmatter delimiters
            if [ "$line" = "---" ]; then
                frontmatter_line=$((frontmatter_line + 1))
                if [ $frontmatter_line -eq 1 ]; then
                    in_frontmatter=1
                    echo "$line" >> "$output_file"
                    continue
                elif [ $frontmatter_line -eq 2 ]; then
                    # End of frontmatter - add date if not already present
                    if [ $printed_date -eq 0 ]; then
                        echo "date: ${year}-${month}-${day}T00:00:00Z" >> "$output_file"
                    fi
                    echo "$line" >> "$output_file"
                    in_frontmatter=0
                    continue
                fi
            fi
            
            if [ $in_frontmatter -eq 1 ]; then
                # Inside frontmatter - transform fields
                if [[ $line =~ ^layout: ]]; then
                    continue  # Skip layout field
                elif [[ $line =~ ^date:\ (.+) ]]; then
                    # Convert date format
                    date_str="${BASH_REMATCH[1]}"
                    # Parse "2015-02-22 15:19:28 +0000" → "2015-02-22T15:19:28Z"
                    if [[ $date_str =~ ([0-9]{4})-([0-9]{2})-([0-9]{2})\ ([0-9]{2}):([0-9]{2}):([0-9]{2}) ]]; then
                        d_year="${BASH_REMATCH[1]}"
                        d_month="${BASH_REMATCH[2]}"
                        d_day="${BASH_REMATCH[3]}"
                        d_hour="${BASH_REMATCH[4]}"
                        d_min="${BASH_REMATCH[5]}"
                        d_sec="${BASH_REMATCH[6]}"
                        echo "date: ${d_year}-${d_month}-${d_day}T${d_hour}:${d_min}:${d_sec}Z" >> "$output_file"
                    else
                        # Fallback: use date from filename
                        echo "date: ${year}-${month}-${day}T00:00:00Z" >> "$output_file"
                    fi
                    printed_date=1
                    continue
                elif [[ $line =~ ^categories:\ (.+) ]]; then
                    # Convert categories to tags
                    cats="${BASH_REMATCH[1]}"
                    # Build tags array
                    IFS=' ' read -ra cat_array <<< "$cats"
                    tag_str="tags: ["
                    first=1
                    for cat in "${cat_array[@]}"; do
                        if [ $first -eq 1 ]; then
                            first=0
                        else
                            tag_str="${tag_str}, "
                        fi
                        tag_str="${tag_str}\"${cat}\""
                    done
                    tag_str="${tag_str}]"
                    echo "$tag_str" >> "$output_file"
                    continue
                elif [[ $line =~ ^comments: ]]; then
                    # Preserve comments field
                    echo "$line" >> "$output_file"
                    continue
                elif [[ $line =~ ^author: ]]; then
                    # Keep author field
                    echo "$line" >> "$output_file"
                    continue
                else
                    # Pass through other frontmatter fields
                    echo "$line" >> "$output_file"
                    continue
                fi
            fi
            
            # Content body - pass through unchanged
            echo "$line" >> "$output_file"
        done < "$jekyll_file"
        
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
