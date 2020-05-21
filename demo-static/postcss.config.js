const tailwindcss = require('tailwindcss');
const { themeTransform } = require('tailwind-compositor');

const compositorConfig = require('./compositor.config.js');
const tailwindConfig = require('./tailwind.config.js');

const transformer = themeTransform(compositorConfig);

module.exports = {
	plugins: [tailwindcss(transformer(tailwindConfig))],
};
