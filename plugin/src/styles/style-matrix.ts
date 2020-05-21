import { Style } from '../types';

export const gridMatrix = ({
	columns,
	rhythm,
	gapX,
	gapY,
}: {
	columns: number;
	rhythm: string;
	gapX: string;
	gapY: string;
}): Style => {
	const result = {
		...(columns && gridMatrixColumns({ columns })),
		...(rhythm && gridMatrixRows({ rhythm: rhythm })),
		...(gapX && gridMatrixGapX({ space: gapX })),
		...(gapY && gridMatrixGapY({ space: gapY })),
	};

	return result;
};

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

export const gridMatrixCell = ({
	start,
	span = 1,
}: {
	start?: number;
	span: number;
}): Style => {
	return start
		? span >= 0
			? {
					gridColumn: `${start} / span ${span}`,
			  }
			: {
					gridColumn: `${start} / ${span}`,
			  }
		: {
				gridColumn: `span ${span}`,
		  };
};

export const gridMatrixGap = ({ space }: { space: string }): Style => {
	return {
		gridRowGap: space,
		gridColumnGap: space,
	};
};

export const gridMatrixGapX = ({ space }: { space: string }): Style => {
	return {
		gridColumnGap: space,
	};
};

export const gridMatrixGapY = ({ space }: { space: string }): Style => {
	return {
		gridRowGap: space,
	};
};
