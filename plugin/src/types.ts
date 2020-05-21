import * as CSS from 'csstype';

export type NumberScale = Array<number>;

export interface FontOpenType {
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

export type FontsScale = Array<FontOpenType>;

export interface Theme {
	useRem: boolean;
	root: number;
	baseline: number;
	typeScale: NumberScale;
	measure: NumberScale;
	rhythm: NumberScale;
	fonts: FontsScale;
}

export interface Style extends CSS.Properties {
	[key: string]: any;
}

export type TypeStyleFontFamilyParams = {
	font: FontOpenType;
};

export type TypeStyleFontFamily = {
	fontFamily: CSS.FontFamilyProperty;
	fontWeight: CSS.FontWeightProperty;
	fontStyle: CSS.FontStyleProperty;
};

export type TypographyStyleRelParams = {
	font: FontOpenType;
	baseline: number;
	root: number;
	size: number;
	leading: number;
};

export type TypographyStyleParams = {
	font: FontOpenType;
	baseline: number;
	size: number;
	leading: number;
};

export type StyleTypography = {
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
};
