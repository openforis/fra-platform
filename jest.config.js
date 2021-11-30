module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  roots: ['<rootDir>'],
  verbose: true,
  testMatch: ['**/integration/index.ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    "@common/(.*)": "<rootDir>/common/$1",
    "@core/(.*)": "<rootDir>/core/$1",
    "@server/(.*)": "<rootDir>/server/$1",
    "@test/(.*)": "<rootDir>/test/$1"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
