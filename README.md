# codebar Blog

A Hugo-based blog for codebar, migrated from Jekyll.

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (v0.146.0 or later)
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

2. **Start the development server:**
   ```bash
   hugo server --bind 0.0.0.0 --buildDrafts
   ```
   Or using Make:
   ```bash
   make serve
   ```

3. **Open in browser:**
   Visit http://localhost:1313

## Available Commands

### Using Make

```bash
make help           # Show all available targets
make build          # Build the site (outputs to public/)
make serve          # Run development server
make check-links    # Check for broken links
make clean          # Remove build artifacts
```

### Using Hugo directly

```bash
# Development server with live reload
hugo server --bind 0.0.0.0 --buildDrafts

# Build for production
hugo --gc --minify

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
│   └── codebar-simple/ # Our custom theme
├── scripts/             # Helper scripts
├── .lychee.toml        # Link checker config
├── hugo.toml           # Site configuration
└── Makefile            # Convenience commands
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

## Deployment

This site is deployed to **Cloudflare Pages**.

### Build Settings

- **Build command:** `hugo --gc --minify`
- **Build output directory:** `/public`
- **Environment variable:** `HUGO_VERSION=0.146.0`

### Redirects

Redirects are configured in `static/_redirects` for old Jekyll URLs. See [Cloudflare Pages Redirects](https://developers.cloudflare.com/pages/configuration/redirects/) documentation.

## Migration Notes

- Originally Jekyll (Octopress)
- 12 posts migrated
- 46 images copied
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

1. Create a new branch for your changes
2. Run `make check-links` before committing
3. Test locally with `make serve`
4. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).
