const tailwindcss = require('tailwindcss');
const postcss = require('postcss');
const tailwindPlugin = require('./tailwind-compositor-plugin');

const compositor = config => css => {
	return postcss().process(css, {
		from: undefined,
	});
};

module.exports = compositor;
