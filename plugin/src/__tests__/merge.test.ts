import transform from '../theme-transform';

import compositorConfig from './fixtures/compositor.config.js';
import tailwindConfig from './fixtures/tailwind.config.js';

const transformer = transform(compositorConfig);

test('runs', () => {
	const tailwindTransformed = transformer(tailwindConfig);
	expect(tailwindTransformed).toMatchSnapshot();
});
