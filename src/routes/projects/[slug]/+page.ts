import { items } from '@data/projects';

export const prerender = false;

export function entries() {
	return items.map((item) => ({ slug: item.slug }));
}

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const project = items.find((item) => {
			return item.slug === params.slug;
		});

		return { project };
	}
}
