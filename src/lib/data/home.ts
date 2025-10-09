import { Platform } from '$lib/types';
import { getSkills } from './skills';

export const title = 'Home';

export const name = 'Maksym';

export const lastName = 'Charuta';

export const description = ['Software Engineer', 'Degree Apprentice', 'Follower of Christ'];
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
	'django',
	'flask',
	'pythonroo',
	'rust',
	'typescript'
);
