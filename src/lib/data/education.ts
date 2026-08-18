import Assets from './assets';
import type { Education } from '../types';

export const items: Array<Education> = [
	{
		degree: 'Digital Technology Solutions (2:1)',
		description: 'Achieved a 2:1 degree classification.',
		location: 'UK',
		logo: Assets.Unknown,
		name: 'Digital Technology Solutions',
		organization: 'University of Warwick',
		period: { from: new Date(2022, 9, 1), to: new Date(2026, 6, 31) },
		shortDescription: '2:1 Degree',
		slug: 'warwick-dts',
		subjects: ['Python', 'Business', 'Web Development', 'IoT', 'C/C++']
	},
	{
		degree: 'A-Levels',
		description: '',
		location: 'UK',
		logo: Assets.Unknown,
		name: 'A-Levels',
		organization: 'Sixth Form',
		period: { from: new Date(2020, 8, 1), to: new Date(2022, 5, 30) },
		shortDescription: 'Maths (A*), Further Maths (A), Physics (B)',
		slug: 'a-levels',
		subjects: ['Maths - A*', 'Further Maths - A', 'Physics - B']
	}
];

export const title = 'Education';
