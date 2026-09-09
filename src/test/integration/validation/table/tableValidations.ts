import { boreal } from './cases/climaticDomain/boreal'
import { otherLand } from './cases/extentOfForest/otherLand'
import { deforestation } from './cases/forestAreaChange/deforestation'
import { totalForestArea } from './cases/forestCharacteristics/totalForestArea'
import { runTableValidationTestCase } from './runTableValidationTestCase'

// TODO: Add cases as they are implemented
const cases = [...boreal, ...otherLand, ...deforestation, ...totalForestArea]

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
