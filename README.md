# codebar Blog

A Hugo-based blog for codebar, migrated from Jekyll.

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.146.0 or later)
- [Node.js](https://nodejs.org/) (v18 or later, for search indexing)
- [lychee](https://lychee.cli.rs/installation/) (optional, for link checking)
- Make (optional, for convenience commands)

### Installing Hugo

**macOS:**
```bash
brew install hugo
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt-get install hugo

# Or download from GitHub releases
# https://github.com/gohugoio/hugo/releases
```

**Verify installation:**
```bash
hugo version
```

### Installing Node.js

Required for search indexing with Pagefind:

**macOS:**
```bash
brew install node
```

**Other platforms:**
Download from [nodejs.org](https://nodejs.org/) or use your package manager.

**Verify installation:**
```bash
node --version
npm --version
```

Then install dependencies:
```bash
npm install
```

### Installing lychee (optional)

For link checking:

**macOS:**
```bash
brew install lychee
```

**Other platforms:**
```bash
# Download from GitHub releases
curl -sSfL https://github.com/lycheeverse/lychee/releases/latest/download/lychee-x86_64-unknown-linux-gnu.tar.gz | tar xz
sudo mv lychee /usr/local/bin/
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hugo-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   hugo server --bind 0.0.0.0 --buildDrafts
   ```
   Or using Make:
   ```bash
   make serve
   ```

4. **Build search index (required for search to work):**
   ```bash
   make index
   ```

5. **Open in browser:**
   Visit http://localhost:1313

## Available Commands

### Using Make

```bash
make help           # Show all available targets
make build          # Build the site and index for search
make index          # Index built site with Pagefind (for search)
make serve          # Run development server
make check-links    # Check for broken links
make clean          # Remove build artifacts
```

**Note:** Search functionality requires the site to be indexed. Run `make index` after building, or use `make build` which includes indexing automatically.

### Using Hugo directly

```bash
# Development server with live reload
hugo server --bind 0.0.0.0 --buildDrafts

# Build for production (without search indexing)
hugo --gc --minify

# Index for search (run after building)
npx pagefind --site public

# Build to specific directory
hugo --destination ./public
```

## Link Checking

We use [lychee](https://lychee.cli.rs/) to check for broken links.

**Configuration:** `.lychee.toml`

**Run locally:**
```bash
# Using Make
make check-links

# Or directly with lychee
lychee --config .lychee.toml --root-dir . 'content/**/*.md'
```

**Note:** Some external links may fail due to rate limiting or temporary issues. The CI runs link checks daily and creates an issue if persistent problems are found.

## Project Structure

```
hugo-blog/
├── archetypes/           # Content templates
├── content/              # Blog posts
│   └── posts/           # Individual posts
├── static/              # Static assets
│   ├── images/         # Images
│   └── _redirects      # Cloudflare Pages redirects
├── themes/              # Hugo themes
│   └── codebar-fresh/  # Our custom theme
├── .lychee.toml        # Link checker config
├── hugo.toml           # Site configuration
├── Makefile            # Convenience commands
├── package.json        # Node dependencies (Pagefind)
└── README.md           # This file
```

## Content Management

### Creating a new post

```bash
hugo new content posts/my-new-post.md
```

Or manually create a file in `content/posts/` with frontmatter:

```markdown
---
title: "My New Post"
date: 2024-01-15T10:00:00Z
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Images

Place images in `static/images/` and reference them with root-relative paths:

```markdown
![Alt text](/images/my-image.jpg)
```

## Search

The blog includes full-text search powered by [Pagefind](https://pagefind.app/).

- Click the search icon (🔍) in the header or press `Tab` to focus it
- Type your query - results appear instantly
- Click a result to navigate, or press `Escape` to close

**For developers:** Search requires the site to be indexed. This happens automatically when you run `make build`, or manually with `make index`.

## Deployment

This site is deployed to **Cloudflare Pages**.

### Build Settings

- **Build command:** `make build` (or `hugo --gc --minify && npx pagefind --site public`)
- **Build output directory:** `/public`
- **Environment variable:** `HUGO_VERSION=0.146.0`

**Note:** For search to work in production, the build command must include Pagefind indexing.

### Redirects

Redirects are configured in `static/_redirects` for old Jekyll URLs. See [Cloudflare Pages Redirects](https://developers.cloudflare.com/pages/configuration/redirects/) documentation.

## Migration Notes

- Originally Jekyll (Octopress)
- Migrated to Hugo with custom `codebar-fresh` theme
- 70+ posts imported from Medium
- Full-text search added via Pagefind
- Feed redirected from `/atom.xml` to Hugo's `/index.xml`

## Troubleshooting

### Hugo not found

Make sure Hugo is installed and in your PATH:
```bash
which hugo
hugo version
```

### Build errors

Clean and rebuild:
```bash
make clean
make build
```

### Link checker not working

Ensure lychee is installed:
```bash
which lychee
lychee --version
```

## Contributing

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/codebar-hugo-blog.git
   cd codebar-hugo-blog
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make your changes** and test locally:
   - Run `make check-links` before committing
   - Test with `make serve`
5. **Commit and push** to your fork:
   ```bash
   git add .
   git commit -m "description of changes"
   git push origin my-feature-branch
   ```
6. **Submit a pull request** from your fork to the main repository

## License

This project is licensed under the [MIT License](LICENSE).
