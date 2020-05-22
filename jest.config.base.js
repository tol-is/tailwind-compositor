module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.tsx$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)?$',
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node', 'css', 'pcss'],
	coveragePathIgnorePatterns: ['(tests/.*.mock).(|ts?|tsx?)$'],
	verbose: true,
	testPathIgnorePatterns: ['/__snapshots__/', '/.cache/', '/lib/', '/dist/'],

	collectCoverage: false,
	collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!<rootDir>/dist/'],
	snapshotSerializers: ['jest-emotion'],
	modulePathIgnorePatterns: [
		'/__snapshots__/',
		'dummy',
		'scripts',
		'docs',
		'__tests__/lib/',
	],
	globals: {
		'process.env.__DEV__': true,
		'process.env.__PROD__': false,
		'process.env.__BROWSER__': false,
		'process.env.__SERVER__': false,
	},
};
