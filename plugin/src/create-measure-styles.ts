import { iTheme } from './types';
import { measure } from './styles/style-measure';

const createMeasureStyles = ({ theme, e, addUtilities }) => {
	const { measure: measureScale, variants }: iTheme = theme('compositor');

	if (!variants.measure) return;

	const measureStyles = measureScale.map((length, idx) => {
		return {
			[`.${e(`measure-${idx}`)}`]: measure({ length }),
		};
	});

	addUtilities(measureStyles, ['responsive']);
};

export default createMeasureStyles;
