import { items, getPostBySlug } from '@data/blog';

export function entries() {
	return items.map((post) => ({ slug: post.slug }));
}

export function load({ params }: { params: Record<string, string> }) {
	return { post: params.slug ? getPostBySlug(params.slug) : undefined };
}
