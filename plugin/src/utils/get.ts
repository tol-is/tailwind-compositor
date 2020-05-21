// based on https://github.com/developit/dlv
export const get = (obj: any, key, def, p: number = 0, undef?) => {
	key = key && key.split ? key.split('.') : [key];
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? def : obj;
};
