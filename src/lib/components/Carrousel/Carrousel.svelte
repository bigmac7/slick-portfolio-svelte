<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';
	import { theme } from '$lib/stores/theme';
	import UIcon from '../Icon/UIcon.svelte';

	export let items: Array<Skill> = [];

	const delay = 2000;
	const itemWidth = 150;

	// Triple the list so a move one step past either end lands on an identical
	// clone; once the (uniform) animation finishes we snap back to the matching
	// real item without a transition, so last -> first looks like any other step.
	$: loop = [...items, ...items, ...items];

	let index = items.length; // start in the middle (real) copy
	let animate = true;
	let timeout: ReturnType<typeof setTimeout> | undefined;

	const step = (right: boolean) => {
		index += right ? 1 : -1;
	};

	const onTransitionEnd = (e: TransitionEvent) => {
		// Ignore transitions bubbling up from child elements (e.g. theme changes).
		if (e.propertyName !== 'transform' || e.target !== e.currentTarget) return;

		const n = items.length;
		if (n === 0) return;

		if (index >= 2 * n || index < n) {
			index = ((index % n) + n) % n + n; // fold back into the middle copy
			animate = false; // jump instantly to the identical real item
			// re-enable the transition once the instant jump has painted
			requestAnimationFrame(() => requestAnimationFrame(() => (animate = true)));
		}
	};

	const play = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			step(true);
			play();
		}, delay);
	};

	const toggleLeft = () => {
		step(false);
		play();
	};

	const toggleRight = () => {
		step(true);
		play();
	};

	onMount(() => play());
	onDestroy(() => clearTimeout(timeout));
</script>

<div class="carrousel flex-[0.5] row-center">
	<button
		class="row-center font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent rounded-[50%] hover:border-[var(--border-hover)]"
		on:click={toggleLeft}
	>
		<UIcon icon="i-carbon-chevron-left" />
	</button>

	<div class="overflow-hidden box-content w-150px">
		<div
			class="row"
			style:transform={`translateX(${-index * itemWidth}px)`}
			style:transition={animate ? 'transform 400ms ease' : 'none'}
			on:transitionend={onTransitionEnd}
		>
			{#each loop as item}
				<div class="box-border w-150px p-15px col-center shrink-0">
					<img
						class="w-120px h-120px aspect-square"
						src={getAssetURL(item.logo, $theme)}
						alt={item.name}
					/>
					<span class="text-center m-t-20px">{item.name}</span>
				</div>
			{/each}
		</div>
	</div>

	<button
		class="row-center font-500 p-5px m-y-0px m-x-10px cursor-pointer border-1px border-solid border-[var(--border)] bg-transparent rounded-[50%] hover:border-[var(--border-hover)]"
		on:click={toggleRight}
	>
		<UIcon icon="i-carbon-chevron-right" />
	</button>
</div>
