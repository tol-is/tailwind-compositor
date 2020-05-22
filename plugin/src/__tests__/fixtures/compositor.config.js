const root = 16;
const baseline = 8;

// type scale in px
const type = [14, 16];

// rhythm scale in baseline units
const rhythm = [0, 1, 2];

// measure scale in characters unit
const measure = [15, 20];

// font config
const fonts = [
	{
		key: 'sans-400',
		familyName: 'IBM Plex Sans',
		fallback: 'sans-serif',
		upm: 1000,
		xHeight: 525,
		capHeight: 698,
		ascent: 1025,
		descent: -275,
		weight: 400,
		italic: false,
	},
];

module.exports = {
	useRem: false,
	baseline,
	root,
	type,
	rhythm,
	measure,
	fonts,
	variants: {
		background: true,
		baseline: true,
		capheight: true,
		xheight: true,
		rhythm: true,
		measure: true,
	},
};
