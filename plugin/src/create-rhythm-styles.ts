import { iTailwindTheme, ICompositorConfig } from './types';
import { owlX, owlY } from './styles';

/**
 *
 *
 */
export const createRhythmStyles = ({
	theme,
	e,
	addUtilities,
}: {
	theme: iTailwindTheme;
	e: any;
	addUtilities: Function;
}) => {
	const { options }: ICompositorConfig = theme('compositor');

	if (!options.rhythm) return;

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
