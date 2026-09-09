import { cases } from './cases'
import { runTableValidationTestCase } from './runTableValidationTestCase'

export default (): void => {
  describe('Table validations', () => {
    test.each(cases)('$name', async (testCase) => {
      const { cell } = testCase

      const result = await runTableValidationTestCase(testCase)

      // A cell without formulas is removed from the validations, which would look like a valid result
      expect(result.validateFns).not.toEqual([])
      expect(result.updatedTableNames).toEqual([cell.tableName])
      expect(result.validation).toEqual(testCase.expected)
    })
  })
}
