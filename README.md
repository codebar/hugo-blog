# codebar Blog

Hugo-based blog migrated from Jekyll.

## Local Development

```bash
hugo server --bind 0.0.0.0 --buildDrafts
```

Visit http://localhost:1313

## Build

```bash
hugo --gc --minify
```

Output is in `public/` directory.

## Cloudflare Pages Deployment

1. Connect this repository to Cloudflare Pages
2. Set build configuration:
   - **Build command:** `hugo --gc --minify`
   - **Build output directory:** `/public`
3. Set environment variable:
   - `HUGO_VERSION` = `0.146.0`
4. Deploy

## Redirects

Redirects are configured in `static/_redirects` for old Jekyll URLs.

## Migration Notes

- Content imported from Jekyll (Octopress)
- 12 posts migrated
- 46 images copied from original blog
- Feed redirected from /atom.xml to Hugo's /index.xml
- Posts with Octopress-specific tags may need manual cleanup

## Rollback

If migration produces bad results:
```bash
rm -rf content/posts url-mapping.txt static/images static/_redirects
```

## Known Issues

- Theme uses deprecated `.Language.LanguageCode` (warning only)
- One post (year-in-review-2015.md) contains raw HTML which Hugo goldmark omits by default
