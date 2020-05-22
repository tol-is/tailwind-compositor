import { StyleTypography, TypeStyleParams } from '../types';

/**
 *
 *
 */
export const styleBaseline = ({
	font,
	baseline,
	size,
	leading = 0,
}: TypeStyleParams): StyleTypography => {
	//
	const preventCollapse = 1;

	// cap height
	const capHeightRatio = font.capHeight / font.upm;
	const capSize = capHeightRatio * size;

	// content box / round up baseline unit
	const typeRows = Math.ceil(capSize / baseline);
	const typeHeight = typeRows * baseline;

	// round leading
	const leadingRound = Math.round(leading);
	// if negative min value is typeRows
	const leadingValue =
		leadingRound < 0
			? Math.min(Math.abs(leadingRound), typeRows) * -1
			: leadingRound;

	// leading height in px
	const leadingHeight = leadingValue * baseline;

	// line-height in px
	const lineHeight = typeHeight + leadingHeight;

	// crop white space top
	const negativeSpace = lineHeight - typeHeight;
	const cropHeight = negativeSpace - (negativeSpace % baseline);

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
		fontSize: `${size}px`,
		lineHeight: `${lineHeight}px`,
		transform: `translateY(${baselineOffset}px)`,
		paddingTop: `${preventCollapse}px`,
		['&:before']: {
			content: `''`,
			marginTop: `${-(cropHeight + preventCollapse)}px`,
			display: 'block',
			height: 0,
		},
	};
};
