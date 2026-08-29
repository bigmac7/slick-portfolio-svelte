/**
 * A small, dependency-free frontmatter parser.
 *
 * It supports the subset of YAML most commonly used when authoring
 * Obsidian-style markdown notes:
 *  - `key: value` scalars (strings, numbers, booleans, null)
 *  - quoted values: `key: "value"` / `key: 'value'`
 *  - inline arrays: `tags: [a, b, c]`
 *  - block arrays:
 *      tags:
 *        - a
 *        - b
 *  - `#comments` (a lone `#` or trailing ` # ...` outside of quotes)
 *
 * This intentionally avoids pulling in a full YAML dependency so the
 * static build stays lightweight and offline-friendly.
 */

export type FrontmatterValue = string | number | boolean | null | Array<string>;

export interface ParsedFrontmatter {
	/** The parsed key/value pairs from the frontmatter block. */
	data: Record<string, FrontmatterValue>;
	/** The markdown body with the frontmatter block removed. */
	content: string;
}

const FRONTMATTER_REGEX = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const stripQuotes = (value: string): string => {
	const trimmed = value.trim();

	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1);
	}

	return trimmed;
};

const coerceScalar = (raw: string): FrontmatterValue => {
	const value = raw.trim();

	// Preserve explicitly quoted values as strings.
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return stripQuotes(value);
	}

	if (value === '' || value === '~' || value.toLowerCase() === 'null') return null;
	if (value.toLowerCase() === 'true') return true;
	if (value.toLowerCase() === 'false') return false;

	// Numbers (kept as string when it would lose precision / has leading zeros).
	if (/^-?\d+(\.\d+)?$/.test(value) && !/^0\d/.test(value)) {
		const num = Number(value);
		if (!Number.isNaN(num)) return num;
	}

	return value;
};

const parseInlineArray = (raw: string): Array<string> => {
	const inner = raw.trim().slice(1, -1).trim();

	if (inner === '') return [];

	return inner
		.split(',')
		.map((part) => stripQuotes(part))
		.filter((part) => part !== '');
};

/**
 * Parse a frontmatter block from the top of a markdown string.
 * When no frontmatter is present, `data` is an empty object and
 * `content` is the original string untouched.
 */
export const parseFrontmatter = (source: string): ParsedFrontmatter => {
	const match = source.match(FRONTMATTER_REGEX);

	if (!match) {
		return { data: {}, content: source };
	}

	const body = source.slice(match[0].length);
	const lines = match[1].split(/\r?\n/);
	const data: Record<string, FrontmatterValue> = {};

	let currentArrayKey: string | null = null;

	for (const line of lines) {
		if (line.trim() === '' || line.trim().startsWith('#')) continue;

		// Block-array item, e.g. `  - value`
		const listItem = line.match(/^\s*-\s+(.*)$/);
		if (listItem && currentArrayKey) {
			(data[currentArrayKey] as Array<string>).push(stripQuotes(listItem[1]));
			continue;
		}

		const keyValue = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
		if (!keyValue) continue;

		const key = keyValue[1];
		const rawValue = keyValue[2].trim();

		if (rawValue === '') {
			// Likely the start of a block array; initialise and wait for `-` items.
			data[key] = [];
			currentArrayKey = key;
			continue;
		}

		currentArrayKey = null;

		if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
			data[key] = parseInlineArray(rawValue);
			continue;
		}

		data[key] = coerceScalar(rawValue);
	}

	return { data, content: body };
};
