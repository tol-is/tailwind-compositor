import * as CSS from 'csstype';

export type NumberScale = Array<number>;

export interface iFontOpenType {
	key: string;
	familyName: string;
	fallback: string;
	upm: number;
	xHeight: number;
	capHeight: number;
	ascent: number;
	descent: number;
	weight: number;
	italic: boolean;
}

// export interface FontVariable {
// 	key: string;
// 	familyName: string;
// 	fallback: string;
// 	upm: number;
// 	xHeight: number;
// 	capHeight: number;
// 	ascent: number;
// 	descent: number;
// 	axis: any; // TODO
// }

export type FontsScale = Array<iFontOpenType>;

type Variants = {
	baseline: boolean;
	capheight: boolean;
	xheight: boolean;
	rhythm: boolean;
	measure: boolean;
};

export interface iTheme {
	useRem: boolean;
	root: number;
	baseline: number;
	type: NumberScale;
	measure: NumberScale;
	rhythm: NumberScale;
	fonts: FontsScale;
	variants: Variants;
}

export interface Style extends CSS.Properties {
	[key: string]: any;
}

export interface TypeFamilyParams {
	font: iFontOpenType;
}

export interface StyleFamily {
	fontFamily: CSS.FontFamilyProperty;
	fontWeight: CSS.FontWeightProperty;
	fontStyle: CSS.FontStyleProperty;
}

export interface TypeStyleRelParams {
	font: iFontOpenType;
	baseline: number;
	root: number;
	size: number;
	leading: number;
}

export interface TypeStyleParams {
	font: iFontOpenType;
	baseline: number;
	size: number;
	leading: number;
}

export interface StyleTypography {
	fontFamily: CSS.FontFamilyProperty;
	fontWeight: CSS.FontWeightProperty;
	fontStyle: CSS.FontStyleProperty;
	display: CSS.DisplayProperty;
	fontSize: CSS.FontSizeProperty<string>;
	lineHeight: CSS.LineHeightProperty<string | number>;
	transform: CSS.TransformProperty;
	paddingTop: CSS.PaddingTopProperty<string>;
	'&:before': {
		content: string;
		marginTop: CSS.MarginProperty<string>;
		display: CSS.DisplayProperty;
		height: CSS.HeightProperty<string | number>;
	};
}
