<script lang="ts">
	import { onMount, untrack, type Snippet } from 'svelte';
	import CommonPage from './CommonPage.svelte';
	import Input from './Input/Input.svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	interface Props {
		title?: string;
		search?: string;
		onsearch?: (search: string) => void;
		children?: Snippet;
	}

	let { title = 'Title', search = $bindable(''), onsearch, children }: Props = $props();
	let searchInput: Input | undefined = $state();

	let mounted = $state(false);

	$effect(() => {
		const query = search.trim().toLowerCase();

		untrack(() => onsearch?.(query));
	});

	$effect(() => {
		if (mounted) {
			let searchParams = new URLSearchParams(window.location.search);

			searchParams.set('q', search);

			const url = `${window.location.protocol}//${window.location.host}${
				window.location.pathname
			}?${searchParams.toString()}`;

			const state = window.history.state;

			window.history.replaceState(state, '', url);

			if (page.url.pathname.startsWith(resolve('/search'))) {
				if (searchInput) {
					searchInput.focus();
				}
			}
		}
	});

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);

		search = searchParams.get('q') ?? '';
		mounted = true;
	});
</script>

<CommonPage {title}>
	<div class="w-100% row">
		<Input bind:this={searchInput} bind:value={search} placeholder={'Search...'} />
	</div>
	<div class="w-100% col flex-1">
		{@render children?.()}
	</div>
</CommonPage>
