import { iTheme } from './types';
import { owlX, owlY } from './styles';

/**
 *
 *
 */
export const createRhythmStyles = ({ theme, e, addUtilities }) => {
	const { variants }: iTheme = theme('compositor');

	if (!variants.rhythm) return;

	const rhythmScale: Array<string> = theme('spacing');

	const rhythmStyles = Object.keys(rhythmScale).map(key => {
		const space: string = rhythmScale[key];
		return {
			[`.${e(`rhythm-${key}`)}`]: owlY({ space }),
			[`.${e(`rhythm-y-${key}`)}`]: owlY({ space }),
			[`.${e(`rhythm-x-${key}`)}`]: owlX({ space }),
		};
	});

	addUtilities(rhythmStyles, ['responsive']);
};

export default createRhythmStyles;
