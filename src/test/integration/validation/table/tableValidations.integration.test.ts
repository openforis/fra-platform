import { validatorOtherLand } from './cases/validatorOtherLand'
import { runTableValidationTestCase } from './runTableValidationTestCase'

// TODO: Add cases as they are implemented: cases = [...validatorOtherLand, ...validatorGreaterThanOrZero, ...]
const cases = validatorOtherLand

describe('Table validations integration test', () => {
  test.each(cases)('$name', async (testCase) => {
    const { cell } = testCase

    const result = await runTableValidationTestCase(testCase)

    // A cell without formulas is removed from the validations, which would look like a valid result
    expect(result.validateFns).not.toEqual([])
    expect(result.updatedTableNames).toEqual([cell.tableName])
    expect(result.validation).toEqual(testCase.expected)
  })
})
