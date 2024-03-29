import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation } from 'meta/assessment'
import { Context } from 'meta/expressionEvaluator/context'

import { calculateCategoriesSum, getValidationMessage } from './utils'

export const validatorSumSubCategoriesNotEqualToParent: ExpressionFunction<Context> = {
  name: 'validatorSumSubCategoriesNotEqualToParent',
  minArity: 5,
  executor: (context) => {
    return (
      parentValue: string | undefined,
      parentLabelKey: string,
      parentTableAnchor: string,
      categoryValues: Array<string | undefined>,
      categoryLabelKeys: Array<string>,
      parentLabelParams?: string,
      parentColLabelKey?: string
    ): NodeValueValidation => {
      const categoriesSum = calculateCategoriesSum(categoryValues, categoryLabelKeys)

      const valid =
        Objects.isEmpty(parentValue) ||
        categoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eqWithTolerance(parentValue, categoriesSum)

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
        'sumSubCategoriesNotEqualToParent',
        parentLabelParams,
        parentColLabelKey
      )

      return { valid, messages }
    }
  },
}
