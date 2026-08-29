---
title: Building a Static Site with SvelteKit
date: 2026-08-15
tags:
  - svelte
  - webdev
  - tooling
excerpt: Notes on shipping a fast, fully static portfolio with SvelteKit's static adapter and prerendering.
---

# Building a Static Site with SvelteKit

SvelteKit makes it surprisingly pleasant to ship a **fully static** site — no
server required. Here are a few notes from wiring up this portfolio.

## Prerendering everything

The `@sveltejs/adapter-static` adapter turns the app into plain HTML, CSS, and
JS. Combined with `export const prerender = true`, every route is rendered at
build time:

```typescript
// src/routes/+layout.server.ts
export const prerender = true;
```

## Dynamic routes need entries

For dynamic routes like `/blog/[slug]`, the adapter needs to know which pages to
generate. That's what the `entries()` function is for:

```typescript
export function entries() {
	return items.map((post) => ({ slug: post.slug }));
}
```

## Loading markdown at build time

Vite's `import.meta.glob` lets us pull every markdown file into the bundle as a
raw string, with **zero runtime fetching**:

```typescript
const modules = import.meta.glob('./posts/*.md', { as: 'raw', eager: true });
```

The result is a fast, resilient site that you can host anywhere — GitHub Pages,
Netlify, Cloudflare Pages, or a plain object store.
