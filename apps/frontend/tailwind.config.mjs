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
		themes: ['cmyk', 'night'],
	},
	darkMode: ['class', '[data-theme="night"]'],
};
