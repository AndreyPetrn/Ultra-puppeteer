const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const suites = require('./suites');

const argv = yargs(hideBin(process.argv))
  .options({ suite: { type: 'string' } })
  .parseSync();
let specFiles;
if (argv.suite) {
  specFiles = suites[argv.suite] || [];
} else {
  specFiles = ['<rootDir>/**/*spec.js'];
}

module.exports = {
  testMatch: specFiles,
  bail: 0,
  clearMocks: true,
  preset: 'jest-puppeteer',
  rootDir: 'dist',
  maxWorkers: 1,
  maxConcurrency: 1,
  testTimeout: 600000,
  verbose: false,
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  reporters: ['default', 'jest-allure']
};
