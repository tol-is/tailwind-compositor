import compositor from './tailwind-compositor';

const {
	merge,
	baselineScaleToRem,
	baselineScaleToPx,
	pxScaleToRem,
} = require('./utils');

export const themeMerge = compositorConfig => tailwindConfig => {
	// first get some tailwind
	// tailwind config values
	const {
		theme = {},
		plugins = {},
		corePlugins,
		variants: variants,
		...tailwindRest
	} = tailwindConfig;

	// extend is nested under theme
	const { extend = {} } = theme;

	// get necessary params from compositor
	// we only need type and rhythm
	// to transform to px or rem usings
	// based on useRem, root and baseline params
	const { useRem, root, baseline, type, rhythm } = compositorConfig;

	// [16,22,30,42,56]
	// type scale is described in px units
	// so transform to rem or px
	// depending on useRem

	const typeScale = useRem
		? pxScaleToRem(root)(type)
		: type.map(v => `${v}px`);

	// [1,2,3,4,5]
	// rhythm scale is described in baseline units
	// transform to tailwind format
	// rem or px depending on useRem param
	const spacingScale = useRem
		? baselineScaleToRem(baseline)(root)(rhythm)
		: baselineScaleToPx(baseline)(rhythm);

	// deconstruct tailwind extend
	// and get height, minHeight, maxHeight scales
	// to merge with the spacingScale
	// don't extend spacing,
	const {
		height = {},
		minHeight = {},
		maxHeight = {},
		fontSize = {},
		...extendRest
	} = extend;

	//
	return {
		...tailwindRest,
		theme: {
			...theme,
			fontSize: typeScale, // overwrite type scale
			spacing: spacingScale, // overwrite spacing scale
			// compositor params via theme
			// rather than plugin below
			compositor: compositorConfig,
			extend: {
				...extendRest,
				height: merge(height, spacingScale),
				minHeight: merge(minHeight, spacingScale),
				maxHeight: merge(maxHeight, spacingScale),
			},
		},
		plugins: [...plugins, compositor()],
		corePlugins: corePlugins,
		variants: variants,
	};
};

export default themeMerge;
