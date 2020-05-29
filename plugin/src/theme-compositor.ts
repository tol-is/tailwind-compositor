import fs from 'fs';
import { iCompositorTheme, iTailwindConfig, iFontOpenType } from './types';

import getFontMetrics from './get-font-metrics';
import tailwindPluginCompositor from './tailwind-plugin-compositor';

import is from './utils/is';
import merge from './utils/merge';
import baselineScaleToRem from './utils/baseline-scale-to-rem';
import baselineScaleToPx from './utils/baseline-scale-to-px';
import pxScaleToRem from './utils/px-scale-to-rem';

const cacheFileName = '.compositor';

type TwTheme = {
	extend: any;
};

const defaultStyles = {
	ruler: {
		color: 'rgba(255, 0, 255, 0.3)',
	},
};

export const compositor = (compositorConfig: iCompositorTheme) => (
	tailwindConfig: iTailwindConfig
): iTailwindConfig => {
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
		theme = {} as TwTheme,
		plugins = [],
		...tailwindRest
	} = tailwindConfig;

	// extend is nested under theme
	const { extend = {} } = theme;

	// get necessary params from compositor
	// we only need type and rhythm
	// to transform to px or rem usings
	// based on useRem, root and baseline params
	const {
		useRem,
		root,
		baseline,
		fonts,
		type,
		rhythm,
		measure,
	} = compositorConfig;
	//

	if (!fontsCached) {
		fontsConfig = [];
		fonts.forEach(({ file, ...fontRest }) => {
			let fontOT: iFontOpenType;
			if (is.string(file) && is.exists(file)) {
				fontOT = merge({ ...fontRest }, getFontMetrics(file));
			} else {
				fontOT = { ...fontRest } as iFontOpenType;
			}

			fontsConfig.push(fontOT);
		});

		fs.writeFileSync(cacheFileName, JSON.stringify(fontsConfig));
	}

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

	//
	// measure scale is described in ch units
	// transform to tailwind format
	// string or ch
	const measureScale = measure.map(m => {
		return is.num(m) ? `${m}ch` : m;
	});

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
	const out = {
		...tailwindRest,
		theme: {
			...theme,
			fontSize: typeScale, // overwrite type scale
			spacing: spacingScale, // overwrite spacing scale
			// compositor params via theme
			// rather than plugin below
			compositor: {
				...compositorConfig,
				styles: defaultStyles,
				measure: measureScale,
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
	};

	return out;
};

export default compositor;
