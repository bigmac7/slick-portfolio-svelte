<script lang="ts">
	import { gfmHeadingId } from 'marked-gfm-heading-id';
	import { mangle } from 'marked-mangle';
	import Prism from 'prismjs';
	import createSanitizer from 'dompurify';
	import { marked } from 'marked';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/themes/prism-tomorrow.css';
	import { onMount, tick } from 'svelte';

	let container: HTMLDivElement | undefined = $state();
	let html = $state('');

	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	onMount(async () => {
		marked.use(gfmHeadingId());
		marked.use(mangle());

		const sanitizer = createSanitizer(window);

		const parsed = await marked.parse(content);

		html = sanitizer.sanitize(parsed);

		await tick();

		if (container) {
			Prism.highlightAllUnder(container);
		}
	});
</script>

<div bind:this={container} class="markdown-container">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- sanitized with DOMPurify above -->
	{@html html}
</div>
