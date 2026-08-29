---
title: Hello World — Welcome to the Blog
date: 2026-08-29
tags: [meta, writing]
excerpt: A quick intro to this blog, how it's built, and how to add your own posts using plain markdown files.
---

# Hello World

Welcome to the blog! This space is powered entirely by **markdown files** — the
same kind you'd write in [Obsidian](https://obsidian.md/). Every post lives in
`src/lib/data/posts/` as a `.md` file, and adding a new one is as simple as
dropping a file in that folder.

## Frontmatter

Each post starts with a YAML **frontmatter** block that describes it:

```yaml
---
title: Hello World — Welcome to the Blog
date: 2026-08-29
tags: [meta, writing]
excerpt: A short summary shown in the listing.
---
```

Supported fields:

- `title` — the post title.
- `date` — the publish date (used for sorting).
- `updated` — an optional "last updated" date.
- `tags` — either inline (`[a, b]`) or a block list.
- `excerpt` — a short summary; auto-derived from the body if omitted.
- `cover` — an optional cover image URL.
- `draft` — set to `true` to hide a work-in-progress post.

## Markdown features

Everything you'd expect from GitHub-flavoured markdown works out of the box:

> Blockquotes look like this — handy for callouts and asides.

Inline `code`, **bold**, _italic_, and [links](https://svelte.dev/) all render
nicely. Code blocks get syntax highlighting:

```typescript
const greet = (name: string): string => `Hello, ${name}!`;

console.log(greet('world'));
```

- Lists
- With
- Items

That's it — happy writing!
