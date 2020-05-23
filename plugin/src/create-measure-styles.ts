import { iTailwindTheme, iCompositorTheme } from './types';
import { measure } from './styles/style-measure';

const createMeasureStyles = ({
	theme,
	e,
	addUtilities,
}: {
	theme: iTailwindTheme;
	e: any;
	addUtilities: Function;
}) => {
	const { measure: measureScale, variants }: iCompositorTheme = theme(
		'compositor'
	);

	if (!variants.measure) return;

	const measureStyles = measureScale.map((length, idx) => {
		return {
			[`.${e(`measure-${idx}`)}`]: measure({ length }),
		};
	});

	addUtilities(measureStyles, ['responsive']);
};

export default createMeasureStyles;
