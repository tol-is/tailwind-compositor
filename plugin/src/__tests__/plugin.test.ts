import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

import transform from '../theme-transform';

import compositorConfig from './stubs/compositor.config.js';
import tailwindConfig from './stubs/tailwind.config.js';

const tailwindConfigTransformed = transform(compositorConfig)(tailwindConfig);

const createPostCSSConfig = (input = '@tailwind utilities;') => {
	return postcss([tailwindcss(tailwindConfigTransformed)])
		.process(input, {
			from: undefined,
		})
		.then(({ css }) => {
			return css;
		});
};

test('utilities run', () => {
	return createPostCSSConfig().then(css => {
		expect(css).toMatchSnapshot();
	});
});
