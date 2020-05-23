import fontkit from 'fontkit';

import get from './utils/get';

type FontKitMetrics = {
	familyName: string;
	upm: number;
	xHeight: number;
	capHeight: number;
	ascent: number;
	descent: number;
	weight: number;
	italic: boolean;
};

export const getFontMetrics = (file: string): FontKitMetrics => {
	const font = fontkit.openSync(file);

	const weight = font['OS/2'].usWeightClass;
	const italic = font['OS/2'].fsSelection.italic;
	const familyName = get(
		font,
		'name.records.preferredFamily.en',
		font.familyName
	) as string;

	return {
		familyName: familyName,
		upm: font.unitsPerEm,
		xHeight: font.xHeight,
		capHeight: font.capHeight,
		ascent: font.ascent,
		descent: font.descent,
		weight: weight,
		italic: italic,
	};
};

export default getFontMetrics;
