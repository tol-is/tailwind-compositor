const tailwindcss = require('tailwindcss');
const twcompo = require('node_modules/tailwind-compositor/dist/index.js');

// const compositorConfig = require('./compositor.config.js');
const tailwindConfig = require('./tailwind.config.js');

console.log(twcompo);
// const tailwindConfigComposed = compositor(compositorConfig)(tailwindConfig);
// debugger;
module.exports = {
	plugins: [
		require('postcss-import')({
			plugins: [require('stylelint')],
		}),
		tailwindcss(tailwindConfig),
		require('postcss-preset-env')({
			stage: 1,
			autoprefixer: { grid: true },
			features: {
				'nesting-rules': true,
			},
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
		}),
	],
};
