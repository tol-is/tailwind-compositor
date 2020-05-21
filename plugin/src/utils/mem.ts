export const mem = func => {
	const mem = {};
	return (...params) => {
		const key = String(params);
		if (!mem[key]) {
			mem[key] = func(...params);
		}
		return mem[key];
	};
};
