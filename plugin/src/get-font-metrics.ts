import fontkit from 'fontkit';

import get from './utils/get';

type FontKitMetrics = {
	familyName: string;
	upm: number;
	xHeight: number;
	capHeight: number;
	lineGap: number;
	ascent: number;
	descent: number;
	weight: number;
	italic: boolean;
};

export const getFontMetrics = (file: string): FontKitMetrics => {
	const font = fontkit.openSync(file);

	const weight = font['OS/2'].usWeightClass;
	const italic = font['OS/2'].fsSelection.italic;


	return {
		familyName: font.familyName,
		upm: font.unitsPerEm,
		xHeight: font.xHeight,
		capHeight: font.capHeight,
		lineGap: font.lineGap,
		ascent: font.ascent,
		descent: font.descent,
		weight: weight,
		italic: italic,
	};
};

export default getFontMetrics;
