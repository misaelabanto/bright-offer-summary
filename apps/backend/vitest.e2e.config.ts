import swc from 'unplugin-swc';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    hookTimeout: 30000,
    testTimeout: 30000,
    root: './',
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [swc.vite()],
});
