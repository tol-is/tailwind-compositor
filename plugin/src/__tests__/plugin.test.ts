test('simple transform', () => {
	// const tailwindConfig = createConfig({});
	// expect(tailwindConfig).toMatchSnapshot();
	expect(true).toBe(true);
});

// import postcss from 'postcss';
// import tailwindcss from 'tailwindcss';

// import { merge } from '../utils';
// import compositor from '../theme-compositor';

// import compositorBaseConfig from './fixtures/compositor.config.js';
// import tailwindConfig from './fixtures/tailwind.config.js';

// const createPostCSSConfig = ({ config, input = '@tailwind utilities;' }) => {
// 	// make config
// 	const compositorConfig = merge(compositorBaseConfig, config);

// 	// transform tailwind theme
// 	const tailwindConfigComposed = compositor(compositorConfig)(tailwindConfig);

// 	// run postcss
// 	return postcss([tailwindcss(tailwindConfigComposed)])
// 		.process(input, {
// 			from: undefined,
// 		})
// 		.then(({ css }) => {
// 			return css;
// 		});
// };

// test('use rem', () => {
// 	const config = {
// 		useRem: true,
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('use px', () => {
// 	const config = {
// 		useRem: false,
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('baseline styles', () => {
// 	const config = {
// 		useRem: false,
// 		utilities: {
// 			xray: true,
//      baseline: true,
// 			capheight: false,
// 			xheight: false,
// 			rhythm: false,
// 			measure: false,
// 		},
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('capheight styles', () => {
// 	const config = {
// 		useRem: false,
// 		utilities: {
// 			xray: false,
//      baseline: false,
// 			capheight: true,
// 			xheight: false,
// 			rhythm: false,
// 			measure: false,
// 		},
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('xheight styles', () => {
// 	const config = {
// 		useRem: false,
// 		utilities: {
// 			xray: false,
// 			baseline: false,
// 			capheight: false,
// 			xheight: true,
// 			rhythm: false,
// 			measure: false,
// 		},
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('rhythm styles', () => {
// 	const config = {
// 		useRem: false,
// 		utilities: {
// 		  xray: false,
// 			baseline: false,
// 			capheight: false,
// 			xheight: false,
// 			rhythm: true,
// 			measure: false,
// 		},
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });

// test('measure styles', () => {
// 	const config = {
// 		useRem: false,
// 		utilities: {
// 		  xray: false,
// 			baseline: false,
// 			capheight: false,
// 			xheight: false,
// 			rhythm: false,
// 			measure: true,
// 		},
// 		},
// 	};
// 	return createPostCSSConfig({ config: config }).then(css => {
// 		expect(css).toMatchSnapshot();
// 	});
// });
