import { Style } from '../types';

export const measure = ({ space }: { space: string }): Style => {
	return {
		maxWidth: `${space}`,
	};
};
