import fs from 'fs';
import { iTheme, iFontOpenType } from './types';

import getFontMetrics from './get-font-metrics';
import tailwindPluginCompositor from './tailwind-plugin-compositor';

const {
	is,
	merge,
	baselineScaleToRem,
	baselineScaleToPx,
	pxScaleToRem,
} = require('./utils');

const cacheFileName = '.compositorrc';

export const themeMerge = (compositorConfig: iTheme) => tailwindConfig => {
	let fontsConfig: Array<iFontOpenType> = [];
	let fontsCached = false;

	try {
		if (fs.existsSync(cacheFileName)) {
			const rawCache: any = fs.readFileSync(cacheFileName);
			fontsConfig = JSON.parse(rawCache);
			fontsCached = true;
		}
	} catch (err) {
		console.error(err);
	}

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
	const { useRem, root, baseline, fonts, type, rhythm } = compositorConfig;
	//

	if (!fontsCached) {
		fonts.forEach(({ file, ...fontRest }) => {
			let fontOT: iFontOpenType;
			if (is.string(file) && is.exists(file)) {
				fontOT = merge({ ...fontRest }, getFontMetrics(file));
			} else {
				fontOT = { ...fontRest } as iFontOpenType;
			}

			console.log(fontOT);
			fontsConfig.push(fontOT);
		});

		fs.writeFileSync(cacheFileName, JSON.stringify(fontsConfig));
	}

	// console.log(fonts);
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
			compositor: {
				...compositorConfig,
				fonts: fontsConfig,
			},
			extend: {
				...extendRest,
				height: merge(height, spacingScale),
				minHeight: merge(minHeight, spacingScale),
				maxHeight: merge(maxHeight, spacingScale),
			},
		},
		plugins: [...plugins, tailwindPluginCompositor()],
		corePlugins: corePlugins,
		variants: variants,
	};
};

export default themeMerge;
