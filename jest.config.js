const base = require('./jest.config.base.js');

module.exports = {
	...base,
	projects: ['<rootDir>/plugin/jest.config.js'],
	setupFilesAfterEnv: ['./jest.setup.js'],
};
