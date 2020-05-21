import { is } from './is';

export const baselineScaleToPx = baseline => scale => {
	const result = Object.keys(scale).reduce((res, key) => {
		const value = scale[key];
		return {
			[key]: is.num(value) ? `${value * baseline}px` : value,
			...res,
		};
	}, {});
	return result;
};
