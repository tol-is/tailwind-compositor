import { is } from './is';
import { pxToRem } from './px-to-rem';

export const baselineScaleToRem = baseline => root => scale => {
	const result = Object.keys(scale).reduce((res, key) => {
		const toRootEm = pxToRem(root);
		const value = scale[key];
		return {
			[key]: is.num(value) ? `${toRootEm(value * baseline)}rem` : value,
			...res,
		};
	}, {});
	return result;
};
