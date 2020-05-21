import { Style } from '../types';

export const owlY = ({ space }: { space: string }): Style => {
	return {
		[`& > * + * `]: {
			marginTop: space,
		},
	};
};

export const owlX = ({ space }: { space: string }): Style => {
	return {
		[`& > * + * `]: {
			marginLeft: space,
		},
	};
};
