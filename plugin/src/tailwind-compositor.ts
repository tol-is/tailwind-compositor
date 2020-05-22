// import createTextStyles from './create-text-styles';
// import createBackgroundStyles from './create-background-styles';

export const compositor = () => {
	return ({ theme, e, addUtilities }) => {
		console.log(theme('compositor.type.0'));
		// createTextStyles({ theme, options, e, addUtilities });
		// createBackgroundStyles({ theme, options, e, addUtilities });
	};
};

export default compositor;
