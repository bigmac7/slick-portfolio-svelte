---
# ── Post metadata (YAML frontmatter) ──────────────────────────────
# Required
title: Your Post Title Here
date: 2026-08-29 # publish date (YYYY-MM-DD), used for sorting

# Optional
updated: 2026-08-30 # "last updated" date, shown under the title
tags: [example, template] # inline list — or use the block form below
excerpt: A one-line summary shown in the listing and used as the meta description. # auto-derived from the body if omitted
cover: # optional cover image URL (leave blank for none)
author: # defaults to the site owner if blank

# Publishing
draft: false # `true` hides the post from the site but still loads it (local previews).

# Block-list form for tags is also supported:
# tags:
#   - example
#   - template
---

# Your Post Title Here

This file is a **reference template**. Because its name starts with an
underscore (`_template.md`), it is excluded from the build entirely — never
bundled, never shipped, never rendered. To write a real post, copy this file to
`src/lib/data/posts/my-post-slug.md` (no leading underscore), fill in the
frontmatter, and write below.

Two ways to keep something off the live site:

- **`_`-prefixed filename** — for scaffolds/templates like this one. Fully
  excluded from the bundle.
- **`draft: true` frontmatter** — for real work-in-progress posts. Hidden from
  the listing and routes, but still loaded so you can preview them locally.

The file name (minus `.md`) becomes the URL slug, e.g. `my-post-slug.md` →
`/blog/my-post-slug`. You can override it with a `slug:` field in the
frontmatter.

## Markdown support

Standard GitHub-flavoured markdown works out of the box:

- **bold**, _italic_, `inline code`, and [links](https://svelte.dev/)
- lists (like this one) and numbered lists
- images: `![alt text](https://example.com/image.png)`

> Blockquotes render as callout-style boxes — handy for asides.

Fenced code blocks get syntax highlighting:

```typescript
const greet = (name: string): string => `Hello, ${name}!`;
```

That's the whole format — happy writing!
