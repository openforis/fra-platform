import { extentOfForest } from './cases/extentOfForest'
import { runTableValidationTestCase } from './runTableValidationTestCase'

// TODO: Add cases as they are implemented: cases = [...extentOfForest, ...forestCharacteristics, ...]
const cases = extentOfForest

describe('Table validation integration test', () => {
  test.each(cases)('$name', async (testCase) => {
    const { cell } = testCase

    const result = await runTableValidationTestCase(testCase)

    expect(result.updatedTableNames).toEqual([cell.tableName])
    expect(result.validation).toEqual(testCase.expected)
  })
})
