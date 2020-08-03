import { Style } from '../types';

export const gridMatrixColumns = ({ columns }: { columns: number }): Style => {
	const result: Style = {
		display: 'grid',
		gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
	};

	return result;
};

export const gridMatrixRows = ({ rhythm }: { rhythm?: string }): Style => {
	const result: Style = {
		gridAutoRows: `minmax(${rhythm}, auto)`,
	};

	return result;
};

export const gridMatrixGap = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridRowGap: rhythm,
		gridColumnGap: rhythm,
	};
};

export const gridMatrixGapX = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridColumnGap: rhythm,
	};
};

export const gridMatrixGapY = ({ rhythm }: { rhythm: string }): Style => {
	return {
		gridRowGap: rhythm,
	};
};
