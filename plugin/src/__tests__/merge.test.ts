import transform from '../theme-transform';

import compositorConfig from './stubs/compositor.config.js';
import tailwindConfig from './stubs/tailwind.config.js';

const transformer = transform(compositorConfig);

test('runs', () => {
	const tailwindTransformed = transformer(tailwindConfig);
	expect(tailwindTransformed).toMatchSnapshot();
});
