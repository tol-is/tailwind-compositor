const base = require('./jest.config.base.js');

module.exports = {
	...base,
	setupFilesAfterEnv: ['./jest.setup.js'],
	projects: ['<rootDir>/plugin/jest.config.js'],
};
