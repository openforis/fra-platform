// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./jest.config.base')

module.exports = {
  ...baseConfig,
  testMatch: ['**/?(*.)+(test).ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/test/integration/', '/src/test/e2e/'],
}
