import { Style } from '../types';

export const matrixColumns = ({ columns }: { columns: number }): Style => {
	const result: Style = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
	};

	return result;
};

export const matrixRows = ({ rhythm }: { rhythm?: string }): Style => {
	const result: Style = {
		gridAutoRows: `minmax(${rhythm}, auto)`,
	};

	return result;
};

export const matrixCellStartX = ({ start }: { start: number }): Style => {
	const result: Style = {
		gridColumnStart: `${start} !important`,
	};

	return result;
};

export const matrixCellSpanX = ({ span }: { span: number }): Style => {
	const result: Style = {
		gridColumn: `auto / span ${span}`,
	};

	return result;
};

export const matrixGap = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridRowGap: rhythm,
		gridColumnGap: rhythm,
	};
};

export const matrixGapX = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridColumnGap: rhythm,
	};
};

export const matrixGapY = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridRowGap: rhythm,
	};
};
