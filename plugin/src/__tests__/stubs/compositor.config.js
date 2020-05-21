const root = 16;
const baseline = 8;

// type scale in px
const type = [14, 16, 18, 20, 22, 24, 28, 32, 36, 40];

// rhythm scale in baseline units
const rhythm = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 21, 24, 28];

// measure scale in characters unit
const measure = [15, 20, 25, 50, 55, 60, 65, 70];

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
	useRem: true,
	baseline,
	root,
	type,
	rhythm,
	measure,
	fonts,
};
