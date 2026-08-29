<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import BlogCard from '$lib/components/BlogCard/BlogCard.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import { items, title, getAllTags } from '@data/blog';
	import type { BlogPost } from '$lib/types';
	import { isBlank } from '@riadh-adrani/utils';

	const allTags = getAllTags();

	let query = '';

	// The active tag comes from the `?tag=` query param so tag links are shareable.
	// Guarded by `browser` because searchParams is unavailable during prerendering.
	$: activeTag = browser ? $page.url.searchParams.get('tag') ?? '' : '';

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		query = e.detail.search;
	};

	const selectTag = (tag: string) => {
		const url = new URL($page.url);

		if (tag === '' || tag === activeTag) {
			url.searchParams.delete('tag');
		} else {
			url.searchParams.set('tag', tag);
		}

		goto(`${url.pathname}${url.search}`, { keepFocus: true, noScroll: true });
	};

	$: result = items.filter((post: BlogPost) => {
		const matchesTag = isBlank(activeTag) || post.tags.includes(activeTag);

		if (!matchesTag) return false;

		if (isBlank(query)) return true;

		const haystack = [post.title, post.excerpt, ...post.tags].join(' ').toLowerCase();

		return haystack.includes(query);
	});
</script>

<SearchPage {title} on:search={onSearch}>
	{#if allTags.length > 0}
		<div class="row flex-wrap items-center gap-1 mt-2">
			<Chip active={activeTag === ''} on:click={() => selectTag('')}>
				<span class="text-0.85em">All</span>
			</Chip>
			{#each allTags as tag}
				<Chip active={tag === activeTag} on:click={() => selectTag(tag)}>
					<span class="text-0.85em">#{tag}</span>
				</Chip>
			{/each}
		</div>
	{/if}

	<div class="col items-stretch relative mt-6 flex-1">
		{#if result.length === 0}
			<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)] flex-1">
				<UIcon icon="i-carbon-pen" classes="text-3.5em" />
				<p class="font-300">No posts found...</p>
			</div>
		{:else}
			{#each result as post (post.slug)}
				<BlogCard {post} {activeTag} />
			{/each}
		{/if}
	</div>
</SearchPage>
