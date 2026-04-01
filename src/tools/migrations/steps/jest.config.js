// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharedConfig = require('../../../jest.config')

module.exports = {
  ...sharedConfig,
  rootDir: path.resolve(__dirname, '..', '..', '..'),
  testMatch: ['<rootDir>/src/test/migrations/index.ts'],
  testTimeout: 3_000_000,
}
