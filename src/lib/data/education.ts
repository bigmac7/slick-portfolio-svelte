import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: 'Digital Technology Solutions',
		description: '',
		location: 'UK',
		logo: Assets.Unknown,
		name: '',
		organization: 'University of Warwick',
		period: { from: new Date(2022, 9, 1), to: new Date(2026, 5, 1) },
		shortDescription: '',
		slug: 'dummy-education-item',
		subjects: ['Python', 'Business', 'Web Development', 'IoT', 'C/C++']
	},
	];

export const title = 'Education';
