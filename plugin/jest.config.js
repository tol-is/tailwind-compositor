const base = require('../jest.config.base.js');
const pack = require('./package.json');
const packageName = pack.name;

module.exports = {
	...base,
	name: packageName,
	displayName: packageName,
};
