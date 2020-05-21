module.exports = {
	purge: [],
	target: 'relaxed',
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		screens: {
			sm: '640px',
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
		},
		spacing: {
			px: '1px',
			'0': '0',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
		},
		flex: {
			auto: '1 1 auto',
		},
		fontFamily: {
			sans: ['system-ui'],
		},
		fontSize: {
			base: '1rem',
			lg: '1.5rem',
		},
		fontWeight: {
			normal: '400',
			bold: '700',
		},
		letterSpacing: {
			normal: '0',
			wide: '0.025em',
		},
		lineHeight: {
			none: '1',
			normal: '1.5',
		},
	},
	variants: {
		accessibility: ['responsive', 'focus'],
	},
	corePlugins: {},
	plugins: [],
	extend: {
		maxHeight: {
			extend: '100px',
		},
		maxWidth: {
			extend: '100px',
		},
		minHeight: {
			extend: '100px',
		},
		minWidth: {
			extend: '100px',
		},
	},
};
