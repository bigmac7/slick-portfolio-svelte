import { Platform } from '#lib/types.ts';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Maksym';

export const lastName = 'Charuta';

export const description = ['Software Engineer', 'Follower of Christ'];
export const links: Array<{ platform: Platform; link: string }> = [
	{ platform: Platform.GitHub, link: 'https://github.com/bigmac7' },
	{
		platform: Platform.Linkedin,
		link: 'https://www.linkedin.com/in/maksym-charuta/'
	}
];

export const skills = getSkills(
	'AWS',
	'Docker',
	'kubernetes',
	'django',
	'flask',
	'python',
	'numpy',
	'pandas',
	'typescript',
	'svelte'
);
