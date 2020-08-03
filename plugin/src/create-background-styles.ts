import { iTailwindTheme, ICompositorConfig } from './types';

import { get } from './utils/get';
import { bgBaselineRel, bgBaseline } from './styles/style-background';

export const createBackgroundStyles = ({
	theme,
	e,
	addUtilities,
}: {
	theme: iTailwindTheme;
	e: any;
	addUtilities: Function;
}) => {
	const { options, root, baseline, styles }: ICompositorConfig = theme(
		'compositor'
	);

	const rulerColor = get(styles, 'ruler.color', '#ff00cc');

	if (!options.xray) return;

	const baselineBgStyles = {
		[`.bg-baseline`]: options.useRem
			? bgBaselineRel({ baseline, root: root, color: rulerColor })
			: bgBaseline({ baseline, color: rulerColor }),
	};

	addUtilities(baselineBgStyles, []);
};

export default createBackgroundStyles;
