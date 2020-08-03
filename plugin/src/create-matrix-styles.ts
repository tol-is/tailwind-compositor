import { iTailwindTheme, ICompositorConfig } from './types';
import {
	gridMatrixColumns,
	gridMatrixRows,
	gridMatrixGap,
	gridMatrixGapX,
	gridMatrixGapY,
} from './styles';

/**
 *
 *
 */
export const createMatrixStyles = ({
	theme,
	e,
	addUtilities,
}: {
	theme: iTailwindTheme;
	e: any;
	addUtilities: Function;
}) => {
	const { options }: ICompositorConfig = theme('compositor');

	if (!options.matrix) return;

	const columnsScale = Array.from(new Array(12 + 1), (v, i) => i);

	const rhythmScale: Array<string> = theme('spacing');

	const matrixColumnsStyles = columnsScale.map(columnIndex => {
		const columns = columnIndex === 0 ? 1 : columnIndex;

		return {
			[`.${e(`matrix-${columnIndex}`)}`]: gridMatrixColumns({
				columns,
			}),
		};
	});

	const matrixRowsStyles = Object.keys(rhythmScale).map(key => {
		const rhythm = rhythmScale[key];
		return {
			[`.${e(`matrix-rhythm-${key}`)}`]: gridMatrixRows({
				rhythm,
			}),
		};
	});

	const matrixGapStyles = Object.keys(rhythmScale).map(key => {
		const rhythm = rhythmScale[key];
		return {
			[`.${e(`matrix-gap-${key}`)}`]: gridMatrixGap({ rhythm }),
			[`.${e(`matrix-gap-x-${key}`)}`]: gridMatrixGapX({ rhythm }),
			[`.${e(`matrix-gap-y-${key}`)}`]: gridMatrixGapY({ rhythm }),
		};
	});

	addUtilities(matrixColumnsStyles, ['responsive']);
	addUtilities(matrixRowsStyles, ['responsive']);
	addUtilities(matrixGapStyles, ['responsive']);
};

export default createMatrixStyles;
