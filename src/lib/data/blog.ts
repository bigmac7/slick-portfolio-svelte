import type { BlogPost } from '$lib/types';
import { parseFrontmatter, type FrontmatterValue } from '$lib/utils/frontmatter';

export const title = 'Blog';

/**
 * Eagerly import every markdown file in `./posts` as a raw string at build
 * time. Adding a new `.md` file to that folder is all that's needed to publish
 * a new post — no code changes required.
 *
 * Underscore-prefixed files (e.g. `_template.md`) are excluded entirely, so
 * reference/scaffold files are never bundled or shipped to the browser. For
 * actual work-in-progress posts, set `draft: true` in the frontmatter instead —
 * those are hidden from the site but still loaded (handy for local previews).
 */
const modules = import.meta.glob(['./posts/*.md', '!./posts/_*.md'], {
	as: 'raw',
	eager: true
});

const WORDS_PER_MINUTE = 200;

const asString = (value: FrontmatterValue | undefined, fallback = ''): string => {
	if (value === undefined || value === null) return fallback;
	if (Array.isArray(value)) return value.join(', ');

	return String(value);
};

const asTags = (value: FrontmatterValue | undefined): Array<string> => {
	if (Array.isArray(value)) return value.map((t) => t.trim()).filter(Boolean);
	if (typeof value === 'string') {
		return value
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean);
	}

	return [];
};

const asDate = (value: FrontmatterValue | undefined): Date | undefined => {
	if (value === undefined || value === null || value === '') return undefined;

	const date = new Date(String(value));

	return Number.isNaN(date.getTime()) ? undefined : date;
};

const computeReadingTime = (content: string): number => {
	const words = content.trim().split(/\s+/).filter(Boolean).length;

	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

/** Derive a slug from the file path, e.g. `./posts/hello-world.md` -> `hello-world`. */
const slugFromPath = (path: string): string => path.split('/').pop()!.replace(/\.md$/, '');

/** Build an excerpt from the body when the frontmatter doesn't provide one. */
const deriveExcerpt = (content: string): string => {
	const paragraph = content
		.replace(/^#.*$/gm, '') // drop headings
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		.find((block) => block.length > 0);

	if (!paragraph) return '';

	const plain = paragraph
		.replace(/[#*_`>[\]()!-]/g, '')
		.replace(/\s+/g, ' ')
		.trim();

	return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
};

const toPost = (path: string, raw: string): BlogPost => {
	const { data, content } = parseFrontmatter(raw);

	const slug = asString(data.slug) || slugFromPath(path);
	const publishDate = asDate(data.date) ?? new Date(0);

	return {
		slug,
		title: asString(data.title) || slug,
		date: publishDate,
		updated: asDate(data.updated),
		tags: asTags(data.tags),
		excerpt: asString(data.excerpt) || asString(data.description) || deriveExcerpt(content),
		readingTime: computeReadingTime(content),
		cover: asString(data.cover) || undefined,
		author: asString(data.author) || undefined,
		content
	};
};

/**
 * All published posts, newest first. A post is considered a draft (and hidden)
 * when its frontmatter sets `draft: true` or `published: false`.
 */
export const items: Array<BlogPost> = Object.entries(modules)
	.filter(([, raw]) => {
		const { data } = parseFrontmatter(raw);

		return data.draft !== true && data.published !== false;
	})
	.map(([path, raw]) => toPost(path, raw))
	.sort((a, b) => b.date.getTime() - a.date.getTime());

export const getPostBySlug = (slug: string): BlogPost | undefined =>
	items.find((post) => post.slug === slug);

/** Every unique tag across all posts, sorted alphabetically. */
export const getAllTags = (): Array<string> => {
	const tags = new Set<string>();

	for (const post of items) {
		for (const tag of post.tags) tags.add(tag);
	}

	return [...tags].sort((a, b) => a.localeCompare(b));
};
