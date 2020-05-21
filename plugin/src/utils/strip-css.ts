// https://github.com/benface/jest-matcher-css/blob/master/index.js
export const stripcss = function(str) {
	return str.replace(/[;\s]/g, '');
};
