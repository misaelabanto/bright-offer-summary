const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project,
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js', 'vitest', '**/*.mock.ts', '**/*.spec.ts'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-function-return-type': [
			'warn',
			{
				allowTypedFunctionExpressions: true,
			},
		],
		'no-magic-numbers': [
			'warn',
			{
				ignoreArrayIndexes: true,
				ignore: [0, 1],
			},
		],
		'require-await': 'warn',
		'import/extensions': 'off',
		'max-depth': ['error', 3],
		'max-statements': ['error', 25],
		'max-params': ['error', 4],
		'no-template-curly-in-string': 'error',
		'no-self-compare': 'error',
		curly: 'error',
		yoda: 'error',
		eqeqeq: ['error', 'always'],
	},
};
