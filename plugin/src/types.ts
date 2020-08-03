import * as CSS from 'csstype';

// type TLengthStyledSystem = string | 0 | number;

// type ObjectOrArray<T> = T[] | { [K: string]: T | ObjectOrArray<T> };

export type NumberScale = Array<number>;

export type FontConfigCache = Array<iFontOpenType>;

export type iTailwindTheme = Function;

export type iTailwindConfig = {
	theme: {
		extend: any;
		[key: string]: any;
	};
	variants: any;
	corePlugins: any;
	plugins: any;
	compositor: ICompositorConfig;
};

export interface iFontOpenType {
	key: string;
	file?: string;
	fallback: string;
	familyName: string;
	upm: number;
	xHeight: number;
	capHeight: number;
	lineGap: number;
	ascent: number;
	descent: number;
	weight: number;
	italic: boolean;
}

export type FontConfigFile = {
	file: string;
	key: string;
	familyName: string;
	fallback: string;
	weight?: number;
	italic?: boolean;
	upm: undefined;
	xHeight: undefined;
	capHeight: undefined;
	ascent: undefined;
	descent: undefined;
};

export type FontsConfig = Array<FontConfigFile | iFontOpenType>;

export interface UtilityOptions {
	useRem: boolean;
	snap: boolean;
	root?: number;
	type: boolean;
	rhythm: boolean;
	measure: boolean;
	matrix: boolean;
	xray: boolean;
}

export interface ICompositorConfig {
	baseline: number;
	leading: number;
	type: NumberScale;
	measure: NumberScale;
	rhythm: NumberScale;
	fonts: FontsConfig;
	options: UtilityOptions;
	styles: iCompositorThemeStyles;
}

export interface iCompositorThemeStyles {
	ruler: {
		color: string;
	};
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
	display: CSS.DisplayProperty;
	'&::before, &::after': {
		content: CSS.ContentProperty;
		height: CSS.HeightProperty<number>;
		display: CSS.DisplayProperty;
	};
}

export interface TypeStyleRelParams {
	font: iFontOpenType;
	baseline: number;
	root: number;
	size: number;
	leading: number;
	useRem: boolean;
}

export interface TypeStyleParams {
	font: iFontOpenType;
	baseline: number;
	size: number;
	snap: boolean;
	leading: number;
	root?: number;
	useRem: boolean;
}

export interface StyleTypography {
	fontSize: CSS.FontSizeProperty<string>;
	lineHeight: CSS.LineHeightProperty<string | number>;
	paddingTop: CSS.PaddingTopProperty<string>;
	paddingBottom: CSS.PaddingTopProperty<string>;
	'&::before': {
		marginTop: CSS.MarginProperty<string>;
	};
	'&::after': {
		marginBottom: CSS.MarginProperty<string>;
	};
}
