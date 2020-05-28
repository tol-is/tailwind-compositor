import { iTailwindTheme, iCompositorTheme, iFontOpenType } from './types';
var flattenDeep = require('lodash.flattendeep');
import {
	styleFontFamily,
	styleBaselineRel,
	styleBaseline,
	styleCapHeight,
	styleCapHeightRel,
} from './styles';

/**
 *
 *
 */
export const createTextStyles = ({
	theme,
	e,
	addUtilities,
}: {
	theme: iTailwindTheme;
	e: any;
	addUtilities: Function;
}) => {
	const {
		useRem,
		root,
		baseline,
		leading,
		fonts,
		type,
		options,
	}: iCompositorTheme = theme('compositor');

	const familyStyles = fonts.map((font: iFontOpenType) => {
		return {
			[`.font-${font.key}`]: styleFontFamily({ font }),
		};
	});

	const leadingScale = Array.from(new Array(leading + 1), (v, i) => i);

	const sizeStyles = flattenDeep(
		fonts.map((font: iFontOpenType) =>
			type.map((size, sizeIdx) => {
				return leadingScale.map(lead => {
					// create baseline styles
					const outputBaseline = useRem
						? styleBaselineRel({
								font: font,
								root: root,
								baseline: baseline,
								size: size,
								leading: lead,
						  })
						: styleBaseline({
								font: font,
								baseline: baseline,
								size: size,
								leading: lead,
						  });

					// apply if variant type is enabled
					const baselineStyles = options.baseline && {
						[`&.${e(`text-${sizeIdx}/${lead}`)}`]: outputBaseline,
					};

					const outputCapHeight = useRem
						? styleCapHeightRel({
								font: font,
								root: root,
								baseline: baseline,
								size: size,
								leading: lead,
						  })
						: styleCapHeight({
								font: font,
								baseline: baseline,
								size: size,
								leading: lead,
						  });

					const capHeightStyles = options.capheight && {
						[`&.${e(
							`capheight-${sizeIdx}/${lead}`
						)}`]: outputCapHeight,
					};

					/*
					const outputXHeight =
						options.xheight && useRem
							? styleXHeight({
									font: font,
									baseline: baseline,
									size: size,
									leading: lead,
							  })
							: styleXHeightRel({
									font: font,
									root: root,
									baseline: baseline,
									size: size,
									leading: lead,
							  });
					const xHeightStyles = options.xheight && {
						[`&.${e(`xheight-${sizeIdx}/${lead}`)}`]: outputXHeight,
					}; */

					return {
						[`.font-${font.key}`]: {
							...baselineStyles,
						},
					};
				});
			})
		)
	);
	addUtilities(familyStyles, []);
	addUtilities(sizeStyles, ['responsive']);
};

export default createTextStyles;
