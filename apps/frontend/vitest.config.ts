import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		setupFiles: ['./vitest.setup.ts'],
		globals: true,
		environment: 'jsdom',
		coverage: {
			exclude: ['**/*.config.{js,mjs}', '**/*.test.{js,jsx,ts,tsx}', 'dist/**'],
		},
	},
});
