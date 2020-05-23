import { iCompositorTheme } from '../types';
import path from 'path';
import { merge } from '../utils';
import transform from '../theme-transform';

import compositorBaseConfig from './fixtures/compositor.config.js';
import tailwindConfig from './fixtures/tailwind.config.js';

const createConfig = config => {
	const compositorConfig: iCompositorTheme = merge(
		compositorBaseConfig,
		config
	);
	const tailwindTransformed = transform(compositorConfig)(tailwindConfig);
	return tailwindTransformed;
};

test('simple transform', () => {
	const tailwindConfig = createConfig({});
	expect(tailwindConfig).toMatchSnapshot();
});

test('transform with font files', () => {
	const tailwindConfig = createConfig({
		fonts: [
			{
				file: path.resolve(
					'plugin/src/__tests__/',
					'fixtures/inter/Inter-Regular.woff'
				),
				key: 'sans-400',
				familyName: 'Inter',
				fallback: 'sans-serif',
				weight: 400,
				italic: true,
			},
		],
	});
	// console.log(tailwindConfig.theme.compositor);
	expect(tailwindConfig).toMatchSnapshot();
});
