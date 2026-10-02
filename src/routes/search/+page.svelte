<script lang="ts">
	import { title } from '#lib/data/search.ts';
	import { filterItemsByQuery, type ItemOrSkill } from '#lib/utils/helpers.ts';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import * as experiences from '#lib/data/experience.ts';
	import * as projects from '#lib/data/projects.ts';
	import * as skills from '#lib/data/skills.ts';

	import type { Icon, Item, Skill } from '#lib/types.ts';

	import SearchPage from '#lib/components/SearchPage.svelte';
	import Chip from '#lib/components/Chip/Chip.svelte';
	import UIcon from '#lib/components/Icon/UIcon.svelte';

	type SearchResultItem = {
		icon: Icon;
		name: string;
		data: Item | Skill;
		to: ResolvedPathname;
	};

	let query = $state('');

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);

		query = searchParams.get('q') ?? '';
	});

	let result: Array<SearchResultItem> = $derived.by(() => {
		const result: Array<SearchResultItem> = [];

		// filter
		result.push(
			...filterItemsByQuery(projects.items, query).map<SearchResultItem>((data) => ({
				data,
				icon: 'i-carbon-cube',
				name: data.name,
				to: resolve('/projects/[slug]', { slug: data.slug })
			}))
		);

		result.push(
			...filterItemsByQuery(
				skills.items as unknown as Array<ItemOrSkill>,
				query
			).map<SearchResultItem>((data) => ({
				data,
				icon: 'i-carbon-software-resource-cluster',
				name: data.name,
				to: resolve('/skills/[slug]', { slug: data.slug })
			}))
		);

		result.push(
			...filterItemsByQuery(experiences.items, query).map<SearchResultItem>((data) => ({
				data,
				icon: 'i-carbon-development',
				name: `${data.name} @ ${data.company}`,
				to: resolve('/experience/[slug]', { slug: data.slug })
			}))
		);

		return result;
	});
</script>

<SearchPage {title} onsearch={(s) => (query = s)}>
	<div class="flex flex-col items-stretch gap-10 p-2"></div>
	{#if !query}
		<div class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]">
			<UIcon icon="i-carbon-search-locate-mirror" classes="text-2em" />
			<span> Try typing something... </span>
		</div>
	{:else}
		<div>
			{#if result.length === 0}
				<div class="flex-1 self-center col-center m-t-10 gap-5 font-300 text-[var(--accent-text)]">
					<UIcon icon="i-carbon-cube" classes="text-2em" />
					<span> Oops ! nothing to show ! </span>
				</div>
			{:else}
				<div class="flex flex-row flex-wrap gap-1">
					{#each result as item}
						<Chip href={item.to} classes="flex flex-row items-center gap-2">
							<UIcon icon={item.icon} />
							<span>{item.name}</span>
						</Chip>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</SearchPage>
