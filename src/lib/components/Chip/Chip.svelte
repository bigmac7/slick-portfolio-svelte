<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	let el: HTMLElement | undefined = $state();

	interface Props {
		active?: boolean;
		size?: string;
		classes?: string;
		href?: string;
		onclick?: MouseEventHandler<HTMLElement>;
		children?: Snippet;
	}

	let {
		active = false,
		size = 'auto',
		classes = '',
		href = '',
		onclick,
		children
	}: Props = $props();

	let className = $derived(
		`row-center cursor-pointer py-[5px] px-[15px] m-[2.5px] decoration-none inline-block border-[1px] border-solid border-[var(--border)] rounded-[20px] tracking-wider text-[0.9em] text-[var(--tertiary-text)] duration-[150ms] font-light  ${
			active
				? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)]'
				: 'bg-transparent hover:bg-[var(--main-hover)]'
		} ${classes}`
	);

	onMount(() => {
		el?.style.setProperty('--size', size);
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element this={href ? 'a' : 'button'} bind:this={el} {href} class={className} {onclick}>
	{@render children?.()}
</svelte:element>
