# Design Brief: codebar Blog Homepage

## 1. Feature Summary

The homepage serves as the primary entry point for the codebar blog. It surfaces the latest community story as a featured highlight, provides scannable access to recent posts, and signals that there's more content available via archive. The goal is to help readers discover stories, feel connected to codebar's ongoing activity, and quickly find something worth reading.

## 2. Primary User Action

**Browse and discover** — scan the featured post and recent list, then click through to read a full post or explore the archive.

## 3. Design Direction

**Color Strategy:** Restrained (per DESIGN.md)
- Tinted warm neutrals dominate the surface
- Codebar blue (`oklch(75% 0.15 250)`) used sparingly for links, focus states, and primary CTAs (≤10%)
- Calm, readable canvas that lets content (photos, stories, voices) take center stage

**Theme Scene Sentence:**  
*A community member checking the blog on their laptop during a lunch break, in a bright coworking space or home office, looking for a quick read that reconnects them to the codebar community.*

**Anchor References:**
- **A List Apart** — editorial clarity, content-first, timeless readability
- **The Guardian (long reads)** — featured story treatment, scannable list below
- **Community newsletter/zine** — approachable, grassroots, human-scale

## 4. Scope

- **Fidelity:** Production-ready Hugo theme
- **Breadth:** Homepage only (post list with featured post)
- **Interactivity:** Static with hover states, focus states, and smooth transitions
- **Responsive:** Mobile-first, breakpoints at 640px, 768px, 1024px, 1280px
- **Time intent:** Ship-ready, not exploratory

## 5. Layout Strategy

**Hero/Featured Section (latest post):**
- Large, prominent treatment for the most recent post
- Full-bleed or near-full-bleed featured image (if post has one)
- Post title, date, author, and brief excerpt (2-3 lines)
- Clear "Read more" CTA

**Recent Posts List (2-5 posts below featured):**
- Compact list items with title, date, author
- Optional: thumbnail image per post
- Clear visual separation from featured section

**Archive Link:**
- Prominent link to full archive (/posts)
- Encourages exploration beyond the fold

**Information Hierarchy:**
1. Featured post (visual weight ~60%)
2. Recent posts list (visual weight ~30%)
3. Archive link + footer (visual weight ~10%)

**Spatial Rhythm:**
- Generous whitespace around featured post (breathing room for the story)
- Tighter spacing on list items (scannable density)
- Consistent 8px base grid, varying scale for rhythm

## 6. Key States

**Default State:**
- Featured post displayed with image, title, metadata, excerpt
- 2-5 recent posts listed below
- Archive link visible

**Empty State (no posts):**
- Friendly message: "No posts yet — check back soon for stories from the codebar community"
- Link to codebar.io main site

**Single Post State:**
- If only one post exists, featured section shows it, no list below

**Many Posts State:**
- Featured post + 5 recent posts + "View all posts" link to archive

**Error State:**
- Static fallback if dynamic content fails (Hugo builds static, so this is build-time concern)

## 7. Interaction Model

**Navigation:**
- Site header with logo and nav links (Home, Posts, Tags)
- Homepage link in header navigates to /

**Post Links:**
- Entire featured post area is clickable
- Individual post titles in list are clickable
- Hover: title color shifts to accent-hover, underline appears
- Focus: visible focus ring (2px outline, offset 2px)

**Archive Link:**
- Styled as button-primary or prominent text link
- Hover: background color shift or underline thickness increase

**Transitions:**
- Link hovers: 150ms ease-out-quart color/thickness transition
- Page load: subtle fade-in (200ms)
- Respect prefers-reduced-motion

## 8. Content Requirements

**Featured Post:**
- Post title (h1 visually, h1 semantically on homepage)
- Publication date (formatted: "January 15, 2024")
- Author name
- Excerpt (auto-generated or frontmatter summary, 150-200 chars)
- Featured image (optional, use placeholder pattern if missing)

**Recent Posts List:**
- Post title (h2 visually)
- Publication date
- Author name
- Optional thumbnail

**Archive Link:**
- Label: "View all posts" or "Browse the archive"
- Links to /posts

**Empty State Copy:**
- "No posts yet"
- Subtext: "Check back soon for stories from the codebar community"
- CTA: "Learn more about codebar →" (links to codebar.io)

## 9. Recommended References

- **spatial-design.md** — layout structure, spacing rhythm, responsive behavior
- **typography.md** — type hierarchy, measure, line heights
- **color-and-contrast.md** — OKLCH usage, accessible color application
- **motion-design.md** — gentle transitions, reduced motion respect

## 10. Open Questions

1. Should the featured post show the full post content or just excerpt? (Brief assumes excerpt)
2. Should recent posts show thumbnails, or text-only for cleaner list? (Brief assumes optional thumbnail)
3. Should author names link to author archives, or be plain text? (Brief assumes plain text for now)
4. Any pagination on homepage, or just featured + fixed number of recent posts? (Brief assumes fixed number + archive link)
