import themeTransform from '../theme-transform';

const compositorConfig = require('./stubs/compositor.config.js');
const tailwindConfig = require('./stubs/tailwind.config.js');

const transformer = themeTransform(compositorConfig);

test('runs', () => {
	const tailwindTransformed = transformer(tailwindConfig);
	expect(tailwindTransformed).toMatchSnapshot();
});
