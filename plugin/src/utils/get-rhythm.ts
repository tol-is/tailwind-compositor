import { is } from './is';
import { get } from './get';
import { pxToRem } from './px-to-rem';

//
export const getRhythm = theme => key => {
	//
	const { useRem, root, baseline } = theme;
	const toRootEm = pxToRem(root);

	const valuePrevix = is.num(key) && key < 0 ? '-' : '';
	const scaleKey = is.num(key) ? Math.abs(key) : key;
	const scaleValue = get(theme.rhythm, scaleKey, scaleKey);

	// if it's just a number, transform to px or rem if useRem
	const styleValue = is.num(scaleValue)
		? is.truthy(useRem)
			? `${valuePrevix}${toRootEm(scaleValue * baseline)}rem`
			: `${valuePrevix}${scaleValue * baseline}px`
		: // else try to get a theme value
		  get(theme, key, key);

	return styleValue;
};

export default getRhythm;
