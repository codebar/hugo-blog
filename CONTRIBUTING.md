# Contributing to the codebar Blog

Thank you for your interest in contributing to the codebar blog! This guide will help you get started.

## Code of Conduct

This project adheres to the [codebar Blog Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report any unacceptable behavior to [hello@codebar.io](hello@codebar.io).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Hugo](https://gohugo.io/installation/) (v0.146.0 or later)
- [Node.js](https://nodejs.org/) (v18 or later)
- [lychee](https://lychee.cli.rs/installation/) (optional, for link checking)

## Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/codebar-hugo-blog.git
   cd codebar-hugo-blog
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   make serve
   ```

5. **Open in browser:**
   Visit http://localhost:1313

## Creating a New Post

### Using Hugo (recommended)

```bash
hugo new posts/my-new-post.md
```

### Manual Creation

Create a new file in `content/posts/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
date: 2024-01-15T10:00:00Z
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Possible frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The title of your post |
| `date` | Yes | Publication date in ISO 8601 format |
| `author` | Yes | Author name |
| `tags` | No | Array of tags for categorization |
| `draft` | No | Set to `true` to keep post as draft (hidden in production) |
| `summary` | Yes | Brief summary of the post (auto-generated if omitted) |

### Images

Place images in `static/images/` and reference them with root-relative paths:

```markdown
![Alt text](/images/my-image.jpg)
```

Always include descriptive alt text for accessibility.

## Content Guidelines

- Write in a clear, accessible style appropriate for a diverse audience
- Use headings to structure your content logically
- Include code examples where relevant, using fenced code blocks with language identifiers
- Proofread for spelling and grammar
- Ensure all links are valid before submitting

## Testing Your Changes

### Local Preview

```bash
make serve
```

### Link Checking

Before submitting your pull request, run the link checker:

```bash
make check-links
```

This will verify that all links in your content are valid.

### Building for Production

```bash
make build
```

This builds the site and generates the search index.

## Submitting a Pull Request

1. **Create a branch** for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```

2. **Make your changes** and test locally

3. **Run the link checker:**
   ```bash
   make check-links
   ```

4. **Commit your changes** with a clear commit message:
   ```bash
   git add .
   git commit -m "Add post about [topic]"
   ```

5. **Push to your fork:**
   ```bash
   git push origin my-feature-branch
   ```

6. **Open a pull request** from your fork to the main repository

### Pull Request Guidelines

- Keep pull requests focused on a single change
- Write a clear description of what you changed and why
- Reference any related issues
- Ensure your post renders correctly in the preview

## Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub. Include:

- A clear description of the issue
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## Content suggestions 

We would love to have members of our community contribute to the blog. Please find below some ideas/suggestions:

- Tell us something technical you've recently learnt (any level)
- "How to" guide
- A beginner friendly write up of something technical
- A tutorial


## Questions?

If you have questions about contributing, feel free to open an issue or drop us an email [hello@codebar.io](hello@codebar.io).
