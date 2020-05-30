// baseline grid row height in px
export const baseline = 4;

// max leading count
export const leading = 8;

// type scale in px
export const type = [
	12,
	14,
	16,
	18,
	20,
	24,
	28,
	32,
	36,
	42,
	48,
	54,
	60,
	68,
	76,
	84,
	92,
];

// rhythm scale in baseline units
export const rhythm = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14];

// measure scale in characters unit
export const measure = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

// font config
export const fonts = [
	{
		key: 'sans-400',
		fallback: 'sans-serif',
		familyName: 'Inter',
		upm: 2816,
		xHeight: 1536,
		capHeight: 2048,
		ascent: 2728,
		descent: -680,
		weight: 400,
		italic: false,
	},
	{
		key: 'sans-400i',
		fallback: 'sans-serif',
		familyName: 'Inter',
		upm: 2816,
		xHeight: 1536,
		capHeight: 2048,
		ascent: 2728,
		descent: -680,
		weight: 400,
		italic: true,
	},
	{
		key: 'sans-600',
		fallback: 'sans-serif',
		familyName: 'Inter',
		upm: 2816,
		xHeight: 1536,
		capHeight: 2048,
		ascent: 2728,
		descent: -680,
		weight: 600,
		italic: false,
	},
	{
		key: 'sans-600i',
		fallback: 'sans-serif',
		familyName: 'Inter',
		upm: 2816,
		xHeight: 1536,
		capHeight: 2048,
		ascent: 2728,
		descent: -680,
		weight: 600,
		italic: true,
	},
];

export const options = {
	root: 16,
	useRem: true,
	xray: true,
	baseline: true,
	capheight: true,
	rhythm: true,
	measure: true,
};
