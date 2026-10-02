<script>
	import MainTitle from './MainTitle/MainTitle.svelte';
	import TabTitle from './TabTitle.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { title = 'Title', children } = $props();
</script>

<TabTitle {title} />
<div class="flex-1 col gap-5 px-2 sm:px-4 md:px-6 py-4 sm:py-8 md:py-12">
	<MainTitle>{title}</MainTitle>
	<div class="col gap-5 flex-1">
		{@render children?.()}
	</div>
</div>
