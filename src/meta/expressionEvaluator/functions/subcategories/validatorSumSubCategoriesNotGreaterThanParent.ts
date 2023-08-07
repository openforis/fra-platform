import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation } from 'meta/assessment'
import { Context } from 'meta/expressionEvaluator/context'

import { calculateCategoriesSum, getValidationMessage } from './utils'

export const validatorSumSubCategoriesNotGreaterThanParent: ExpressionFunction<Context> = {
  name: 'validatorSumSubCategoriesNotGreaterThanParent',
  minArity: 6,
  executor: (context) => {
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

      const messages = getValidationMessage(
        context,
        parentValue,
        parentLabelKey,
        parentTableAnchor,
        categoriesSum,
        categoryLabelKeys,
        'sumSubCategoriesExceedParent'
      )

      return { valid, messages }
    }
  },
}
