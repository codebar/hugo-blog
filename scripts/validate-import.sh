#!/bin/bash
set -e

HUGO_CONTENT="content/posts"
ERRORS=0

echo "=== Validating Hugo Content Import ==="
echo ""

# Check for unconverted Liquid block tags
echo "Checking for unconverted Liquid block tags..."
LIQUID_BLOCKS=$(grep -r "{%" "$HUGO_CONTENT/" 2>/dev/null | grep -v "<!--" || true)
if [ -n "$LIQUID_BLOCKS" ]; then
    echo "⚠ WARNING: Found Jekyll Liquid block tags:"
    echo "$LIQUID_BLOCKS" | head -10
    ERRORS=$((ERRORS + 1))
else
    echo "✓ No Liquid block tags found"
fi

# Check for Jekyll variable syntax (but allow Hugo shortcodes {{< >}} and {{ .Variable }})
echo ""
echo "Checking for Jekyll variable syntax..."
JEKYLL_VARS=$(grep -r "{{" "$HUGO_CONTENT/" 2>/dev/null | grep -v "{{[<$]" | grep -v "{{ \." | grep -v "{{$" || true)
if [ -n "$JEKYLL_VARS" ]; then
    echo "⚠ WARNING: Found potential Jekyll Liquid variables:"
    echo "$JEKYLL_VARS" | head -10
    ERRORS=$((ERRORS + 1))
else
    echo "✓ No Jekyll Liquid variables found"
fi

# Check frontmatter delimiters
echo ""
echo "Checking frontmatter delimiters..."
MISSING_DELIMITER=0
for file in "$HUGO_CONTENT"/*.md; do
    if [ -f "$file" ]; then
        first_line=$(head -1 "$file")
        if [ "$first_line" != "---" ]; then
            echo "⚠ Missing frontmatter start delimiter in: $file"
            MISSING_DELIMITER=$((MISSING_DELIMITER + 1))
        fi
        # Check for end delimiter (should be on line 2+ before blank line)
        if ! awk 'NR>1 && /^---$/ {found=1; exit} END {exit !found}' "$file"; then
            echo "⚠ Missing frontmatter end delimiter in: $file"
            MISSING_DELIMITER=$((MISSING_DELIMITER + 1))
        fi
    fi
done
if [ $MISSING_DELIMITER -eq 0 ]; then
    echo "✓ All posts have valid frontmatter delimiters"
else
    ERRORS=$((ERRORS + MISSING_DELIMITER))
fi

# Verify date field exists
echo ""
echo "Checking for date fields..."
MISSING_DATE=0
for file in "$HUGO_CONTENT"/*.md; do
    if [ -f "$file" ]; then
        if ! grep -q "^date:" "$file"; then
            echo "⚠ Missing date field in: $file"
            MISSING_DATE=$((MISSING_DATE + 1))
        fi
    fi
done
if [ $MISSING_DATE -eq 0 ]; then
    echo "✓ All posts have date fields"
else
    ERRORS=$((ERRORS + MISSING_DATE))
fi

# Count posts
echo ""
POST_COUNT=$(ls -1 "$HUGO_CONTENT"/*.md 2>/dev/null | wc -l)
echo "Total posts: $POST_COUNT"

# Summary
echo ""
if [ $ERRORS -eq 0 ]; then
    echo "=== ✓ Validation passed ==="
    exit 0
else
    echo "=== ✗ Validation failed with $ERRORS issues ==="
    exit 1
fi
