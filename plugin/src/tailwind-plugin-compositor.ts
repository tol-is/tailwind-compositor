import createTextStyles from './create-text-styles';
import createBackgroundStyles from './create-background-styles';
import createMeasureStyles from './create-measure-styles';
import createRhythmStyles from './create-rhythm-styles';

export const tailwindPluginCompositor = () => {
	return ({ theme, e, addUtilities }) => {
		createTextStyles({ theme, e, addUtilities });
		createBackgroundStyles({ theme, e, addUtilities });
		createMeasureStyles({ theme, e, addUtilities });
		createRhythmStyles({ theme, e, addUtilities });
	};
};

export default tailwindPluginCompositor;
