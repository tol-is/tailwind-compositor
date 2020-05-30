const baseline = 10;

const leading = 2;

// type scale in px
const type = [10, 20];

// rhythm scale in baseline units
const rhythm = [0, 1, 2];

// measure scale in characters unit
const measure = [10, 20];

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
	baseline,
	leading,
	type,
	rhythm,
	measure,
	fonts,
	options: {
		useRem: false,
		root: 10,
		xray: true,
		baseline: true,
		capheight: true,
		rhythm: true,
		measure: true,
	},
};
