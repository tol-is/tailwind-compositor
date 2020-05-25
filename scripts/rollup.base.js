import typescript from 'rollup-plugin-typescript2';

export const createRollupConfig = pkg => ({
	input: ['src/index.ts'],
	//
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
		},
		{
			file: pkg.module,
			format: 'es',
			exports: 'named',
		},
	],
	//
	external: [...Object.keys(pkg.peerDependencies || {})],
	plugins: [
		typescript({
			clean: true,
			typescript: require('typescript'),
		}),
	],
});
