module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>'],
  verbose: true,
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules'],
  // moduleNameMapper: {
  //   'i18n/(.*)': '<rootDir>/src/i18n/$1',
  //   'client/(.*)': '<rootDir>/src/client/$1',
  //   'meta/(.*)': '<rootDir>/src/meta/$1',
  //   'server/(.*)': '<rootDir>/src/server/$1',
  //   'test/(.*)': '<rootDir>/src/test/$1',
  //   'utils/(.*)': '<rootDir>/src/utils/$1',
  // },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
