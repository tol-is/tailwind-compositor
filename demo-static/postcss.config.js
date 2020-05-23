const tailwindcss = require('tailwindcss');
const twcompo = require('tailwind-compositor');

// const compositorConfig = require('./compositor.config.js');
const tailwindConfig = require('./tailwind.config.js');

console.log('twcompo');
// const tailwindConfigComposed = compositor(compositorConfig)(tailwindConfig);
// debugger;
module.exports = {
	plugins: [
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
