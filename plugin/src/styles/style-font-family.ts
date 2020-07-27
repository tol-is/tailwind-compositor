import { TypeFamilyParams, StyleFamily } from '../types';

/**
 *
 *
 */
export const styleFontFamily = (params: TypeFamilyParams): StyleFamily => {
	//
	const { font } = params;

	return {
		fontFamily: `"${font.familyName}", ${font.fallback}`,
		fontWeight: font.weight,
		fontStyle: font.italic ? 'italic' : 'normal',
		display: 'block',
		['&::before, &::after']: {
			content: `''`,
			display: 'block',
			height: 0,
		},
	};
};
