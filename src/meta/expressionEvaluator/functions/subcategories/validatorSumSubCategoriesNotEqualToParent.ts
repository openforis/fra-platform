import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { Context } from 'meta/expressionEvaluator/context'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { calculateCategoriesSum } from './utils'

export const validatorSumSubCategoriesNotEqualToParent: ExpressionFunction<Context> = {
  name: ValidatorName.sumSubCategoriesNotEqualToParent,
  minArity: 5,
  executor: () => {
    return (
      parentValue: string | undefined,
      parentLabelKey: string,
      parentTableAnchor: string,
      categoryValues: Array<string | undefined>,
      categoryLabelKeys: Array<string>,
      parentLabelParams?: string,
      parentColLabelKey?: string
    ): NodeValueValidation => {
      const categoriesSum = calculateCategoriesSum(categoryValues)

      const valid =
        Objects.isEmpty(parentValue) ||
        categoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eqWithTolerance(parentValue, categoriesSum)

      if (valid) {
        return { valid }
      }

      return {
        valid,
        messages: [
          {
            name: ValidatorName.sumSubCategoriesNotEqualToParent,
            key: 'generalValidation.sumSubCategoriesNotEqualToParent',
            params: {
              categoriesSum: Numbers.format(categoriesSum),
              categoryLabelKeys,
              parentColLabelKey,
              parentLabelKey,
              parentLabelParams,
              parentTableAnchor,
              parentValue: Numbers.format(Number(parentValue)),
            },
          },
        ],
      }
    }
  },
}
