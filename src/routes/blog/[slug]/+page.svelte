<script lang="ts">
	import { base } from '$app/paths';
	import { title } from '@data/blog';
	import * as HOME from '@data/home';
	import type { BlogPost } from '$lib/types';

	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';
	import Chip from '$lib/components/Chip/Chip.svelte';
	import Banner from '$lib/components/Banner/Banner.svelte';
	import UIcon from '$lib/components/Icon/UIcon.svelte';
	import CardDivider from '$lib/components/Card/CardDivider.svelte';

	export let data: { post?: BlogPost };

	$: post = data.post;
	$: computedTitle = post ? `${post.title} - ${title}` : title;

	const formatDate = (date: Date): string =>
		date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
</script>

<TabTitle title={computedTitle} />

<div class="pb-10 overflow-x-hidden col flex-1">
	{#if post === undefined}
		<div class="p-5 col-center gap-3 m-y-auto text-[var(--accent-text)]">
			<UIcon icon="i-carbon-document-unknown" classes="text-3.5em" />
			<p class="font-300">Could not find this post...</p>
			<a class="text-[var(--link)] decoration-none" href={`${base}/blog`}>← Back to the blog</a>
		</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<Banner img={post.cover ?? ''}>
				<div class="col-center p-y-20 px-2">
					<div class="text-0.9em">
						<MainTitle>{post.title}</MainTitle>
					</div>
					<p
						class="font-300 text-[var(--tertiary-text)] m-y-2 text-center row-center flex-wrap gap-4"
					>
						<span class="row-center gap-1">
							<UIcon icon="i-carbon-user" />
							{post.author ?? `${HOME.name} ${HOME.lastName}`}
						</span>
						<span class="row-center gap-1">
							<UIcon icon="i-carbon-calendar" />
							{formatDate(post.date)}
						</span>
						<span class="row-center gap-1">
							<UIcon icon="i-carbon-time" />
							{post.readingTime} min read
						</span>
					</p>
					{#if post.updated}
						<p class="font-300 text-0.8em text-[var(--tertiary-text)] text-center">
							Updated {formatDate(post.updated)}
						</p>
					{/if}
					<div class="w-75%">
						<CardDivider />
					</div>
					{#if post.tags.length > 0}
						<div class="row-center flex-wrap m-b-2">
							{#each post.tags as tag}
								<Chip href={`${base}/blog?tag=${encodeURIComponent(tag)}`}>
									<span class="text-[0.9em]">#{tag}</span>
								</Chip>
							{/each}
						</div>
					{/if}
				</div>
			</Banner>
			<div class="pt-3 pb-1 overflow-x-hidden w-full">
				<div class="px-10px m-y-5">
					<Markdown content={post.content} />
				</div>
				<div class="px-10px">
					<a
						class="text-[var(--link)] decoration-none row items-center gap-1"
						href={`${base}/blog`}
					>
						<UIcon icon="i-carbon-arrow-left" />
						<span>Back to all posts</span>
					</a>
				</div>
			</div>
		</div>
	{/if}
</div>
