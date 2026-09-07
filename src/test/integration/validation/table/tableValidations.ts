import { validatorGreaterThanOrZero } from './cases/validatorGreaterThanOrZero'
import { validatorOtherLand } from './cases/validatorOtherLand'
import { validatorSumEqualTo } from './cases/validatorSumEqualTo'
import { validatorTotalForest } from './cases/validatorTotalForest'
import { runTableValidationTestCase } from './runTableValidationTestCase'

// TODO: Add cases as they are implemented
const cases = [...validatorGreaterThanOrZero, ...validatorOtherLand, ...validatorSumEqualTo, ...validatorTotalForest]

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
