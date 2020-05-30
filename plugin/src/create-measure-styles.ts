import { iTailwindTheme, ICompositorConfig } from './types';
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
	const { measure: measureScale, options }: ICompositorConfig = theme(
		'compositor'
	);

	if (!options.measure) return;

	const measureStyles = Object.keys(measureScale).map(key => {
		const space = measureScale[key];
		return {
			[`.${e(`measure-${key}`)}`]: measure({ space }),
		};
	});

	addUtilities(measureStyles, ['responsive']);
};

export default createMeasureStyles;
