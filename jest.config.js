module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>'],
  rootDir: 'src',
  verbose: true,
  testMatch: ['**/*.test.ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    'i18n/(.*)': '<rootDir>/i18n/$1',
    'client/(.*)': '<rootDir>/client/$1',
    'meta/(.*)': '<rootDir>/meta/$1',
    'server/(.*)': '<rootDir>/server/$1',
    'test/(.*)': '<rootDir>/test/$1',
    'utils/objects(.*)': '<rootDir>/utils/objects$1',
    'utils/arrays(.*)': '<rootDir>/utils/arrays$1',
    'utils/dates(.*)': '<rootDir>/utils/dates$1',
    'utils/functions(.*)': '<rootDir>/utils/functions$1',
    'utils/numbers(.*)': '<rootDir>/utils/numbers$1',
    'utils/strings(.*)': '<rootDir>/utils/strings$1',
    'utils/uuids(.*)': '<rootDir>/utils/uuids$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
