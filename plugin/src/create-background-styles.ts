import { iTailwindTheme, iCompositorTheme } from './types';
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
	const { variants, baseline, root, useRem }: iCompositorTheme = theme(
		'compositor'
	);

	if (!variants.background) return;

	const baselineBgStyles = {
		[`.bg-baseline`]: useRem
			? bgBaselineRel({ baseline, root })
			: bgBaseline({ baseline }),
	};

	addUtilities(baselineBgStyles, []);
};

export default createBackgroundStyles;
