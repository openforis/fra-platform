import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { Context } from 'meta/expressionEvaluator/context'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { calculateCategoriesSum } from './utils'

export const validatorSumSubCategoriesNotGreaterThanParent: ExpressionFunction<Context> = {
  name: 'validatorSumSubCategoriesNotGreaterThanParent',
  minArity: 6,
  executor: () => {
    return (
      parentValue: string | undefined,
      parentLabelKey: string,
      parentTableAnchor: string,
      categoryValues: Array<string | undefined>,
      categoryLabelKeys: Array<string>,
      categoryIndex: number
    ): NodeValueValidation => {
      const categoriesSum = calculateCategoriesSum(categoryValues, categoryLabelKeys)

      const valid =
        Objects.isEmpty(parentValue) ||
        Objects.isEmpty(categoryValues[categoryIndex]) ||
        categoryValues.length === 0 ||
        Numbers.greaterThanWithTolerance(parentValue, categoriesSum)

      if (valid) {
        return { valid }
      }

      return {
        valid,
        messages: [
          {
            validatorName: validatorSumSubCategoriesNotGreaterThanParent.name,
            key: 'generalValidation.sumSubCategoriesExceedParent',
            params: {
              categoriesSum: Numbers.format(categoriesSum),
              categoryLabelKeys,
              parentLabelKey,
              parentTableAnchor,
              parentValue: Numbers.format(Number(parentValue)),
            },
          },
        ],
      }
    }
  },
}
