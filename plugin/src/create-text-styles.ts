import { iTheme } from './types';
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
export const createTextStyles = ({ theme, e, addUtilities }) => {
	const { useRem, root, baseline, fonts, type, variants }: iTheme = theme(
		'compositor'
	);

	const familyStyles = fonts.map(font => {
		return {
			[`.font-${font.key}`]: styleFontFamily({ font }),
		};
	});

	const leading = Array.from(new Array(6), (v, i) => i);
	const sizeStyles = flattenDeep(
		fonts.map(font =>
			type.map((size, sizeIdx) => {
				return leading.map(lead => {
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

					const baselineStyles = variants.baseline && {
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

					const capHeightStyles = variants.capheight && {
						[`&.${e(
							`capheight-${sizeIdx}/${lead}`
						)}`]: outputCapHeight,
					};

					const outputXHeight =
						variants.xheight && useRem
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
					const xHeightStyles = variants.xheight && {
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
