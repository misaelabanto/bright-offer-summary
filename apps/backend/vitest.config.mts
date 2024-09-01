import swc from 'unplugin-swc';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
		hookTimeout: 10000,
		globals: true,
		alias: {
			'~': fileURLToPath(new URL('./src', import.meta.url)),
		},
		environment: 'node',
		include: ['src/**/*.spec.ts'],
		typecheck: {
			include: ['./src/**/*.ts', './test/**/*.ts'],
		},
		coverage: {
			enabled: true,
			provider: 'v8',
			exclude: [
				'**/*.js',
				'**/*.schema.ts',
				'**/*.module.ts',
				'**/*.mock.ts',
				'**/*.dto.ts',
				'**/*.d.ts',
				'**/*.config.ts',
				'test/**/*',
				'turbo/**',
				'src/**/*.spec.ts',
			],
		},
		root: './',
	},
	plugins: [
		swc.vite({
			module: { type: 'es6' },
			sourceMaps: true,
			sourceRoot: 'src',
		}),
		tsconfigPaths(),
	],
});
