import { is } from './is';
export const scaleAddSuffix = suffix => scale => {
	//
	const result = Object.keys(scale).reduce((res, key) => {
		const value = scale[key];
		//
		return {
			[key]: is.num(value) ? `${value}${suffix}` : value,
			...res,
		};
	}, {});
	return result;
};

export default scaleAddSuffix;
