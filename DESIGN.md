# Design

## Color

Primary palette in OKLCH. Neutrals are tinted slightly toward the brand blue (hue 250) for warmth and cohesion.

```css
/* Background scale - tinted warm grays */
--color-bg-primary: oklch(99% 0.003 250);      /* near-white, page background */
--color-bg-secondary: oklch(96% 0.006 250);    /* subtle sections, cards */
--color-bg-tertiary: oklch(92% 0.008 250);     /* hover states, borders */

/* Text scale */
--color-text-primary: oklch(25% 0.02 250);     /* headings, primary text */
--color-text-secondary: oklch(45% 0.015 250);  /* body text */
--color-text-tertiary: oklch(60% 0.01 250);    /* captions, metadata */

/* Accent - codebar blue, restrained use */
--color-accent: oklch(75% 0.15 250);           /* links, focus, CTAs */
--color-accent-hover: oklch(68% 0.16 250);     /* link hover */
--color-accent-subtle: oklch(95% 0.05 250);    /* tinted backgrounds */

/* Semantic */
--color-success: oklch(75% 0.14 160);          /* green - success states */
--color-error: oklch(65% 0.22 25);             /* magenta - errors, warnings */
```

### Color Strategy
**Restrained**: Tinted neutrals dominate the surface. The accent blue appears sparingly (≤10%) for interactive elements and focus states. This creates a calm, readable canvas that lets content — photos, stories, community voices — take center stage.

## Typography

### Font Family
```css
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Inter is a friendly, highly legible sans-serif with open apertures and warm curves. It feels approachable and modern without being trendy.

### Type Scale
```css
/* Major Third scale (1.25 ratio) */
--text-xs: 0.75rem;      /* 12px - captions, tags */
--text-sm: 0.875rem;     /* 14px - metadata, small UI */
--text-base: 1.125rem;   /* 18px - body text */
--text-lg: 1.25rem;      /* 20px - lead paragraphs */
--text-xl: 1.5rem;       /* 24px - h4 */
--text-2xl: 1.875rem;    /* 30px - h3 */
--text-3xl: 2.25rem;     /* 36px - h2 */
--text-4xl: 3rem;        /* 48px - h1, post titles */
```

### Line Heights
```css
--leading-tight: 1.2;    /* headings */
--leading-snug: 1.35;    /* subheadings */
--leading-normal: 1.6;   /* body text */
--leading-relaxed: 1.75; /* long-form reading */
```

### Measure
```css
--measure-narrow: 45ch;  /* captions, side notes */
--measure-normal: 65ch;  /* body text max */
--measure-wide: 75ch;    /* comfortable upper limit */
```

Body text capped at 65ch for comfortable reading. Sufficient weight contrast between headings (600-700) and body (400).

## Spacing

```css
/* 8px base grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px */
--space-12: 6rem;     /* 96px */
--space-16: 8rem;     /* 128px */
```

Section spacing varies by context: tight on post lists, generous around hero elements. Rhythm beats uniformity.

## Elevation

Minimal elevation — this is a content-focused blog, not an application.

```css
--shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.05), 0 2px 4px -2px oklch(0% 0 0 / 0.05);
--shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.05), 0 4px 6px -4px oklch(0% 0 0 / 0.05);
```

Cards and containers use subtle shadows only when they need separation from the page background.

## Border Radius

```css
--radius-sm: 4px;   /* small UI elements */
--radius-md: 8px;   /* cards, buttons */
--radius-lg: 12px;  /* featured elements */
--radius-full: 9999px; /* pills, avatars */
```

Slightly rounded corners feel friendly without being playful. Avoids the clinical sharpness of 0px and the toy-like feel of heavy rounding.

## Motion

**Gentle energy**: Soft, calm transitions that respect the reader's focus.

```css
/* Easing - exponential out for natural deceleration */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);

/* Durations */
--duration-fast: 150ms;    /* micro-interactions */
--duration-normal: 250ms;  /* standard transitions */
--duration-slow: 350ms;    /* emphasis moments */
```

### Principles
- Never animate layout properties (width, height, top, left)
- Prefer opacity and transform for all motion
- Respect `prefers-reduced-motion: reduce`
- Page transitions: subtle fade (200ms)
- Link hovers: color shift + underline reveal (150ms)
- Focus rings: instant for accessibility

## Components

### Buttons

Primary button for CTAs only (donate, subscribe, join):

```css
.button-primary {
  background: var(--color-accent);
  color: oklch(100% 0 0);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: background var(--duration-fast) var(--ease-out-quart);
}

.button-primary:hover {
  background: var(--color-accent-hover);
}
```

### Links

```css
a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
  transition: color var(--duration-fast) var(--ease-out-quart);
}

a:hover {
  color: var(--color-accent-hover);
  text-decoration-thickness: 2px;
}
```

### Cards

Used sparingly — only when content truly needs containment:

```css
.card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}
```

Avoid card grids of identical items. Vary sizes, use inline layouts, or let content breathe without containers.

### Images

```css
img {
  border-radius: var(--radius-sm);
}

figure {
  margin: var(--space-8) 0;
}

figcaption {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-top: var(--space-2);
}
```

Images are content, not decoration. Let them sit naturally in the flow without heavy borders or shadows.

### Post List Item

```css
.post-list-item {
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--color-bg-tertiary);
}

.post-list-item h2 {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.post-meta {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}
```

Clean, scannable list without heavy containers. Focus on titles and clear hierarchy.

## Layout

### Container

```css
.container {
  max-width: 75rem;      /* 1200px */
  margin: 0 auto;
  padding: 0 var(--space-5);
}
```

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Grid

Single-column for reading. Two-column (content + sidebar) on larger screens only where navigation aids discovery.

```css
/* Post layout */
.post-layout {
  display: grid;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .post-layout {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
}
```

## Accessibility

- All interactive elements have visible focus rings (2px outline, offset 2px)
- Color alone never conveys meaning (icons + text for status)
- Touch targets minimum 44x44px
- Skip link to main content
- Semantic HTML structure (article, nav, main, aside)
