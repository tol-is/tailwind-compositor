const root = 10;

const baseline = 10;

const leading = 2;

const matrix = 6;

const type = [10, 20];

const rhythm = [0, 1, 2];

const measure = [10, 20];

const fonts = [
	{
		key: 'sans-400',
		familyName: 'IBM Plex Sans',
		fallback: 'sans-serif',
		upm: 1000,
		xHeight: 525,
		capHeight: 698,
		ascent: 1025,
		lineGap: 0,
		descent: -275,
		weight: 400,
		italic: false,
	},
];

module.exports = {
	root,
	baseline,
	leading,
	matrix,
	type,
	rhythm,
	measure,
	fonts,
	options: {
		useRem: false,
		snap: true,
		type: true,
		rhythm: true,
		measure: true,
		matrix: true,
		xray: true,
	},
};
