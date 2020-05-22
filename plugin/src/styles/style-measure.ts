import { Style } from '../types';

export const measure = ({ length }: { length: number }): Style => {
	return {
		maxWidth: `${length}ch`,
	};
};
