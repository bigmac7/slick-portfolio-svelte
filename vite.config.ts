import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';

export default defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({ fallback: '404.html' }),
			paths: {
				// Served from the domain root by default (Netlify). Set BASE_PATH when deploying under a
				// sub-path, e.g. BASE_PATH=/slick-portfolio-svelte for GitHub Pages (see deploy.yml).
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`
			},
			inspector: {
				showToggleButton: 'always'
			}
		})
	]
});
