import { items, getPostBySlug } from '@data/blog';

// 'auto' rather than `true` so the build doesn't fail when there are zero
// published posts (an empty `entries()`). Existing posts are still prerendered;
// with none, the route falls back to the static 404.html and renders client-side.
export const prerender = 'auto';

export function entries() {
	return items.map((post) => ({ slug: post.slug }));
}

export function load({ params }: { params: Record<string, string> }) {
	return { post: params.slug ? getPostBySlug(params.slug) : undefined };
}
