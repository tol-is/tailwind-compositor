import { StyleTypography, TypeStyleParams } from '../types';

/**
 *
 *
 */
export const styleText = ({
	font,
	baseline,
	size,
	leading = 0,
	snap = false,
  root = null,
  useRem = false,
}: TypeStyleParams): StyleTypography => {

	// ratios
  const preventCollapse = 0.4;
  const descentAbs = Math.abs(font.descent);
  const capHeightRatio = font.capHeight / font.upm;
  const xHeightRatio = font.xHeight / font.upm;
  const ascentRatio = (font.ascent - font.capHeight) / font.upm;
  const descentRatio = descentAbs / font.upm;

  // bounding box
  const boundingBox = font.ascent + descentAbs + font.lineGap;
  const boundingBoxHeight = (boundingBox / font.upm) * size;

  // type height
  const capSize = capHeightRatio * size;
  const baselineRows = capSize / baseline;
  const typeRows = Math.round(baselineRows);
  // const typeRows = capSize / baseline % 1 < 0.8 ? Math.floor(baselineRows) : Math.ceil(baselineRows);
  const typeHeight = snap ? typeRows * baseline : capSize;

  // leading
  const leadingValue = snap ? Math.round(leading) : leading;
  const minLeading = snap ? typeRows : typeHeight;
  const typeLeading =
    leading < 0 ? Math.max(leadingValue, minLeading * -1) : leadingValue;

  // line height
  const typeLineGap = typeLeading * baseline;
  const typeLineHeight = typeHeight + typeLineGap;

  // leading trim
  const lineGapHeight = (font.lineGap / font.upm) * size;
  const lineHeightOffset =
    (boundingBoxHeight - typeLineHeight - lineGapHeight) / 2;

  const trimTop = ascentRatio * size - lineHeightOffset;
  const trimBottom = descentRatio * size - lineHeightOffset;

  // align to baseline
  const paddingTop = snap
    ? preventCollapse + ((trimBottom + trimTop) % baseline)
    : preventCollapse;

  const trimTopSize = trimTop * -1 - preventCollapse;
  const trimBottomSize = trimBottom * -1 - preventCollapse;

  const trimTopValue = useRem? `${trimTopSize/size}em` : `${trimTopSize}px`;
  const trimBottomValue = useRem ? `${trimBottomSize/size}em` : `${trimBottomSize}px`;

  const fontSizeValue = useRem ? `${size/root}rem` : `${size}px`
  const lineHeightValue = useRem ? `${typeLineHeight/size}` : `${size}px`
  const paddingTopValue = useRem ? `${paddingTop/size}em` : `${preventCollapse}px`;
  const paddingBottomValue = useRem ? `${preventCollapse/size}em` : `${preventCollapse}px`;

	return {
		fontSize: fontSizeValue,
		lineHeight: lineHeightValue,
		paddingTop: paddingTopValue,
		paddingBottom: paddingBottomValue,
		['&::before']: {
			marginTop: trimTopValue,
		},
		['&::after']: {
			marginBottom: trimBottomValue,
		},
	};
};
