import { StyleTypography, TypeStyleRelParams } from '../types';

/**
 *
 *
 */
export const styleBaselineRel = ({
	font,
	baseline,
	root,
	size,
	leading = 0,
}: TypeStyleRelParams): StyleTypography => {
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

	// trim white space top
	const negativeSpace = lineHeight - typeHeight;
	const trimHeight = negativeSpace - (negativeSpace % baseline);

	// align to baseline
	const boundingBoxHeight =
		((font.ascent + Math.abs(font.descent)) / font.upm) * size;

	const descendHeight = Math.abs(font.descent / font.upm) * size;
	const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
	const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

	return {
		display: 'block',
		fontSize: `${size / root}rem`,
		lineHeight: `${lineHeight / size}`,
		transform: `translateY(${baselineOffset / size}em)`,
		paddingTop: `${preventCollapse}px`,
		['&:before']: {
			content: `''`,
			marginTop: `calc(${-(trimHeight + preventCollapse) / size}em )`,
			display: 'block',
			height: 0,
		},
	};
};
