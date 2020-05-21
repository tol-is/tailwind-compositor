const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const compositor = require('./tailwind-compositor');

expect.extend({
	toMatchCss: cssMatcher,
});

const createPostCSSConfig = (pluginOptions = {}) => {
	return postcss(
		tailwindcss(
			Object.assign(
				{
					theme: {
						spacing: {
							1: 2,
							2: 4,
						},
						screens: {
							sm: '640px',
						},
					},
					corePlugins: false,
					plugins: [compositor(pluginOptions)],
				},
				{}
			)
		)
	)
		.process('@tailwind utilities', {
			from: undefined,
		})
		.then(({ css }) => {
			console.log(css);
			return css;
		});
};

test('runs', () => {
	return createPostCSSConfig({
		responsive: true,
		baseline: 8,
		leadMax: 0,
		typeScale: [10, 12],
		rhythmScale: [0, 1],
		measureScale: [40, 80],
		fonts: {
			inter: [
				{
					familyName: 'Inter',
					upm: 2816,
					xHeight: 1536,
					capHeight: 2048,
					ascent: 2728,
					descent: -680,
					weight: 700,
					italic: false,
				},
				{
					familyName: 'Inter',
					upm: 2816,
					xHeight: 1536,
					capHeight: 2048,
					ascent: 2728,
					descent: -680,
					weight: 700,
					italic: true,
				},
			],
		},
	}).then(css => {
		expect(true).toBe(true);
	});
});
