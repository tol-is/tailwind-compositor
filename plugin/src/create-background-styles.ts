import { bgBaselineRel, bgBaseline } from './styles/style-background';

export const createBackgroundStyles = ({ theme, e, addUtilities }) => {
	const { variants, baseline, root, useRem } = theme('compositor');

	if (!variants.background) return;

	const baselineBgStyles = {
		[`.bg-baseline`]: useRem
			? bgBaselineRel({ baseline, root })
			: bgBaseline({ baseline }),
	};

	addUtilities(baselineBgStyles, []);
};

export default createBackgroundStyles;
