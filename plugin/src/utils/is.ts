export const is = {
	truthy: n => n !== undefined && n !== null && n !== false,
	exists: n => n !== undefined && n !== null,
	undefined: n => n === undefined,
	array: n => Array.isArray(n),
	num: n => typeof n === 'number' && !Number.isNaN(n),
	func: f => typeof f === 'function',
	object: n => typeof n === 'object' && n !== null,
	emptyObject: obj =>
		Object.entries(obj).length === 0 && obj.constructor === Object,
	string: str => Object.prototype.toString.call(str) === '[object String]',
	cssunit: value =>
		[
			'px',
			'em',
			'ex',
			'ch',
			'rem',
			'vh',
			'vw',
			'vmin',
			'vmax',
			'inherit',
		].some(u => value.includes(u)),
};
