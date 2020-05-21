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
		theme: themeTw = {},
		plugins: pluginsTw = [],
		corePlugins: corePluginsTw = {},
		...tailwindRest
	} = tailwindConfig;

	// extend is nested under theme
	const { extend: extendTw = {} } = themeTw;

	// get necessary params from compositor
	// we only need type and rhythm
	// to transform to px or rem usings
	// based on useRem, root and baseline params
	const { useRem, root, baseline, type, rhythm } = compositorConfig;

	// [16,22,30,42,56]
	// type scale is described in px units
	// so transform to rem or px
	// depending on useRem

	const typeScaleTransformed = useRem
		? pxScaleToRem(root)(type)
		: type.map(v => `${v}px`);

	// [1,2,3,4,5]
	// rhythm scale is described in baseline units
	// transform to tailwind format
	// rem or px depending on useRem param
	const spacingTransformed = useRem
		? baselineScaleToRem(baseline)(root)(rhythm)
		: baselineScaleToPx(baseline)(rhythm);

	// deconstruct tailwind extend
	// and get height, minHeight, maxHeight scales
	// to merge with the spacingScale
	const {
		height = {},
		minHeight = {},
		maxHeight = {},
		fontSize: fontSizeExtend = {},
		...extendRestTw
	} = extendTw;

	const extendTransformed = {
		...extendRestTw,
		fontSize: merge(fontSizeExtend, typeScaleTransformed),
		height: merge(height, spacingTransformed),
		minHeight: merge(minHeight, spacingTransformed),
		maxHeight: merge(maxHeight, spacingTransformed),
	};

	// compose tailwind config object
	// {
	//   theme:
	//   plugins:
	//   corePlugins:
	// }

	const out = {
		...tailwindRest,
		theme: {
			...themeTw,
			...compositorConfig,
			spacing: spacingTransformed,
			extend: extendTransformed,
		},
		plugins: [...pluginsTw, compositor(compositorConfig)],
		corePlugins: merge(corePluginsTw, {}),
	};

	return out;
};

export default themeMerge;
