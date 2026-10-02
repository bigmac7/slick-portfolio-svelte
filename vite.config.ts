import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

const base = '/slick-portfolio-svelte';

export default defineConfig(({ mode }) => ({
	plugins: [
		UnoCSS(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({ fallback: '404.html' }),
			paths: {
				base: mode === 'production' ? base : ''
			},
			inspector: {
				showToggleButton: 'always'
			}
		})
	]
}));
