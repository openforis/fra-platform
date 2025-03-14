module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest/presets/js-with-ts',
  rootDir: 'src',
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  verbose: true,
}
