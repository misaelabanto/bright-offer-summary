import daisyui from 'daisyui';
import path from 'path';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		path.join(
			path.dirname(require.resolve('@bright-offer-summary/ui')),
			'**/*.tsx'
		),
	],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				solar: {
					primary: '#5eead4',
					secondary: '#facc15',
					accent: '#fdba74',
					neutral: '#d1d5db',
					'base-100': '#e7e5e4',
					info: '#93c5fd',
					success: '#4ade80',
					warning: '#f97316',
					error: '#ec4899',
				},
			},
		],
	},
};
