import { cycleCases } from './cycleCases'
import { runTableValidationTestCase } from './runTableValidationTestCase'

export default (): void => {
  describe('Table validations', () => {
    cycleCases.forEach((cycle) => {
      const { assessmentName, cases, cycleName } = cycle

      describe(`${assessmentName} ${cycleName}`, () => {
        cases.forEach((testCase) => {
          test(testCase.name, async () => {
            const { cell } = testCase

            const result = await runTableValidationTestCase({ assessmentName, cycleName, testCase })

            // A cell without formulas is removed from the validations, which would look like a valid result
            expect(result.validateFns).not.toEqual([])
            expect(result.updatedTableNames).toEqual([cell.tableName])
            expect(result.validation).toEqual(testCase.expected)
          })
        })
      })
    })
  })
}
