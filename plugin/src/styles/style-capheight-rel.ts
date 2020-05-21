import { StyleTypography, TypographyStyleRelParams } from '../types';

/**
 *
 *
 */
export const styleCapHeightRel = ({
	font,
	baseline,
	root,
	size,
	leading = 0,
}: TypographyStyleRelParams): StyleTypography => {
	//
	const preventCollapse = 1;

	// cap height
	const capHeightRatio = font.capHeight / font.upm;
	const typeHeight = capHeightRatio * size;

	//
	const typesRows = Math.floor(typeHeight / baseline);

	// round leading
	const leadingRound = Math.round(leading);
	// if negative min value is typeRows
	const leadingValue =
		leadingRound < 0
			? Math.min(Math.abs(leadingRound), typesRows) * -1
			: leadingRound;

	// leading height in px
	const leadingHeight = leadingValue * baseline;

	// line-height in px
	const lineHeight = typeHeight + leadingHeight;

	// crop white space top
	const negativeSpace = lineHeight - typeHeight;
	const cropHeight = negativeSpace;

	// align to baseline
	const boundingBoxHeight =
		((font.ascent + Math.abs(font.descent)) / font.upm) * size;
	const descendHeight = Math.abs(font.descent / font.upm) * size;
	const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
	const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

	return {
		fontFamily: `"${font.familyName}", ${font.fallback}`,
		fontWeight: font.weight,
		fontStyle: font.italic ? 'italic' : 'normal',
		display: 'block',
		fontSize: `${size / root}rem`,
		lineHeight: `${lineHeight / size}`,
		transform: `translateY(${baselineOffset / size}em)`,
		paddingTop: `${preventCollapse}px`,
		['&:before']: {
			content: `''`,
			marginTop: `calc(${-(cropHeight + preventCollapse) / size}em )`,
			display: 'block',
			height: 0,
		},
	};
};

export default styleCapHeightRel;
