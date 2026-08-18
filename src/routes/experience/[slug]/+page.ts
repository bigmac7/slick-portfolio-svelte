import { items } from '@data/experience';

export function entries() {
	return items.map((item) => ({ slug: item.slug }));
}

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const experience = items.find((item) => {
			return item.slug === params.slug;
		});

		return { experience };
	}
}
