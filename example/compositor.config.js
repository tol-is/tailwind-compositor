const path = require('path');

// baseline grid row height in px
const baseline = 8;

// max leading count
const leading = 4;

// type scale in px
const type = [
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
const rhythm = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14];
rhythm.px = '1px';
rhythm.half = 0.5;

// measure scale in characters unit
const measure = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
measure.auto = 'auto';

// font config
const fonts = [
	{
		key: 'sans-400',
		fallback: 'sans-serif',
		file: path.resolve('./fonts/inter/Inter-Regular.woff2'),
	},
	{
		key: 'sans-700',
		fallback: 'sans-serif',
		file: path.resolve('./fonts/inter/Inter-Bold.woff2'),
	},
	{
		key: 'sans-600',
		fallback: 'sans-serif',
		file: path.resolve('./fonts/inter/Inter-SemiBold.woff2'),
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
		root: 16,
		useRem: true,
		xray: true,
		baseline: true,
		capheight: true,
		rhythm: true,
		measure: true,
	},
};
