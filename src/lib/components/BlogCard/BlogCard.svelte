<script lang="ts">
	import type { BlogPost } from '$lib/types';
	import { base } from '$app/paths';
	import Card from '../Card/Card.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import CardDivider from '../Card/CardDivider.svelte';
	import Chip from '../Chip/Chip.svelte';
	import UIcon from '../Icon/UIcon.svelte';

	export let post: BlogPost;
	/** Currently active tag filter, so the matching chip can be highlighted. */
	export let activeTag = '';

	const formatDate = (date: Date): string =>
		date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
</script>

<Card margin="0px 0px 20px 0px" tiltDegree={1.5} href={`${base}/blog/${post.slug}`} color="blue">
	<div class="col gap-3 w-full">
		<CardTitle title={post.title} />
		<div class="row flex-wrap items-center gap-4 text-0.85em font-300 text-[var(--tertiary-text)]">
			<div class="row items-center gap-1">
				<UIcon icon="i-carbon-calendar" classes="text-1.15em" />
				<span>{formatDate(post.date)}</span>
			</div>
			<div class="row items-center gap-1">
				<UIcon icon="i-carbon-time" classes="text-1.15em" />
				<span>{post.readingTime} min read</span>
			</div>
		</div>
		<CardDivider />
		<p class="text-[0.9em] font-300 leading-relaxed text-[var(--tertiary-text)]">
			{post.excerpt}
		</p>
		{#if post.tags.length > 0}
			<div class="row flex-wrap items-center mt-2">
				{#each post.tags as tag}
					<Chip active={tag === activeTag} href={`${base}/blog?tag=${encodeURIComponent(tag)}`}>
						<span class="text-0.85em">#{tag}</span>
					</Chip>
				{/each}
			</div>
		{/if}
	</div>
</Card>
