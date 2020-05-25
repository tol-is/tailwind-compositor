import { iTailwindTheme, iCompositorTheme, iFontOpenType } from './types';
var flattenDeep = require('lodash.flattendeep');
import {
	styleFontFamily,
	styleBaselineRel,
	styleBaseline,
	styleCapHeightRel,
	styleCapHeight,
	styleXHeightRel,
	styleXHeight,
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
		fonts,
		type,
		utilities,
	}: iCompositorTheme = theme('compositor');

	const familyStyles = fonts.map((font: iFontOpenType) => {
		return {
			[`.font-${font.key}`]: styleFontFamily({ font }),
		};
	});

	const leading = Array.from(new Array(6), (v, i) => i);
	const sizeStyles = flattenDeep(
		fonts.map((font: iFontOpenType) =>
			type.map((size, sizeIdx) => {
				return leading.map(lead => {
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

					// apply if variant baseline
					const baselineStyles = utilities.baseline && {
						[`&.${e(`type-${sizeIdx}/${lead}`)}`]: outputBaseline,
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

					const capHeightStyles = utilities.capheight && {
						[`&.${e(
							`capheight-${sizeIdx}/${lead}`
						)}`]: outputCapHeight,
					};

					const outputXHeight =
						utilities.xheight && useRem
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
					const xHeightStyles = utilities.xheight && {
						[`&.${e(`xheight-${sizeIdx}/${lead}`)}`]: outputXHeight,
					};

					return {
						[`.font-${font.key}`]: {
							...baselineStyles,
							...capHeightStyles,
							...xHeightStyles,
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
