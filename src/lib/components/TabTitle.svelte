<script lang="ts">
	import { titleSuffix } from '#lib/data/app.ts';
	import { useTitle } from '#lib/utils/helpers.ts';

	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<svelte:head>
	<title>{useTitle(title, titleSuffix)}</title>
</svelte:head>
