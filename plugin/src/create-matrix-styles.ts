import { iTailwindTheme, ICompositorConfig } from './types';
import {
	matrixColumns,
	matrixGap,
	matrixGapX,
	matrixGapY,
	matrixCellStartX,
	matrixCellSpanX,
	matrixCellStartY,
	matrixCellSpanY,
	matrixRows,
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
	const { matrix, options }: ICompositorConfig = theme('compositor');

	if (!options.matrix) return;

	const columnsScale = Array.from(new Array(matrix + 1), (v, i) => i);

	const rhythmScale: Array<string> = theme('spacing');

	const matrixColumnsStyles = columnsScale.map(columnIndex => {
		const columns = columnIndex === 0 ? 1 : columnIndex;

		return {
			[`.${e(`matrix-${columnIndex}`)}`]: matrixColumns({
				columns,
			}),
		};
	});

	const matrixCellStyles = columnsScale.map(columnIndex => {
		const column = columnIndex === 0 ? 1 : columnIndex;

		return {
			[`.${e(`cell-start-x-${column}`)}`]: matrixCellStartX({
				start: column,
			}),
			[`.${e(`cell-span-x-${column}`)}`]: matrixCellSpanX({
				span: column,
			}),
			[`.${e(`cell-start-y-${column}`)}`]: matrixCellStartY({
				start: column,
			}),
			[`.${e(`cell-span-y-${column}`)}`]: matrixCellSpanY({
				span: column,
			}),
		};
	});

	const matrixGapStyles = Object.keys(rhythmScale).map(key => {
		const rhythm = rhythmScale[key];
		return {
			[`.${e(`matrix-row-h-${key}`)}`]: matrixRows({
				size: rhythm,
			}),
			[`.${e(`matrix-gap-${key}`)}`]: matrixGap({ rhythm }),
			[`.${e(`matrix-gap-x-${key}`)}`]: matrixGapX({ rhythm }),
			[`.${e(`matrix-gap-y-${key}`)}`]: matrixGapY({ rhythm }),
		};
	});

	addUtilities(matrixColumnsStyles, ['responsive']);
	addUtilities(matrixGapStyles, ['responsive']);
	addUtilities(matrixCellStyles, ['responsive']);
};

export default createMatrixStyles;
