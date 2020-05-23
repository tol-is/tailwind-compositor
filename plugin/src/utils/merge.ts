export const merge = (a, b) => {
	let result = Object.assign({}, a, b);
	for (const key in a) {
		if (!a[key] || typeof b[key] !== 'object') continue;
		Object.assign(result, {
			[key]: Object.assign(a[key], b[key]),
		});
	}
	return result;
};

export default merge;
