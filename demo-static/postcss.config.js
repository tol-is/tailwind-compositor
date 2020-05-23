const tailwindcss = require('tailwindcss');
const { transform } = require('tailwind-compositor');

const compositorConfig = require('./compositor.config.js');
const tailwindConfig = require('./tailwind.config.js');

const transformer = transform(compositorConfig);

console.log(transformer(tailwindConfig));

module.exports = {
	plugins: [tailwindcss(transformer(tailwindConfig))],
};
