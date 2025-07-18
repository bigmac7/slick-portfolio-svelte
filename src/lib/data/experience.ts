import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from '../types';

export const items: Array<Experience> = [
	{
		slug: 'software-jlr',
		company: 'JLR',
		description: 'Making Automotive Applications',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2022, 9, 1), to: new Date() },
		skills: getSkills('python', 'AWS', 'Docker', 'REST APIs'),
		name: 'Software Engineer',
		color: 'blue',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Making Automotive Applications'
	},
	{
		slug: 'software-saic',
		company: 'SAIC',
		description: 'Making Automotive Applications',
		contract: ContractType.FullTime,
		type: 'Software Development',
		location: 'Home',
		period: { from: new Date(2018, 5, 1), to: new Date(2018, 5, 5) },
		skills: getSkills('python', 'Mathematics'),
		name: 'Software Engineer',
		color: 'blue',
		links: [],
		logo: Assets.Unknown,
		shortDescription: 'Making Automotive Applications'
	},
];

export const title = 'Experience';
