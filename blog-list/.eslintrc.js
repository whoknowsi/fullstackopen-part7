module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
		'jest/globals': true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:cypress/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'jest'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'no-console': 0,
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
}
