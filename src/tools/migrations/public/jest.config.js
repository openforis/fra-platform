// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharedConfig = require('../../../../jest.config')

module.exports = {
  ...sharedConfig,
  rootDir: path.resolve(__dirname, '..', '..', '..'),
  testMatch: ['<rootDir>/src/tools/migrations/public/index.ts'],
  testTimeout: 3_000_000,
}
