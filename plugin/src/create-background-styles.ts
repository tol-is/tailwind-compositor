import {
	iTailwindTheme,
	iCompositorTheme,
	iCompositorThemeStyles,
} from './types';

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
	const { options, baseline, root, useRem, styles }: iCompositorTheme = theme(
		'compositor'
	);

	const rulerColor = get(styles, 'ruler.color', '#ff00cc');

	if (!options.xray) return;

	const baselineBgStyles = {
		[`.bg-baseline`]: useRem
			? bgBaselineRel({ baseline, root, color: rulerColor })
			: bgBaseline({ baseline, color: rulerColor }),
	};

	addUtilities(baselineBgStyles, []);
};

export default createBackgroundStyles;
