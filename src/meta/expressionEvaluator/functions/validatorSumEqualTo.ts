import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorSumEqualTo: ExpressionFunction<Context> = {
  name: 'validatorSumEqualTo',
  minArity: 2,
  executor: () => {
    return (
      categoryValues: Array<string | undefined>,
      categoryLabelKeys: Array<string>,
      maxValue: string
    ): NodeValueValidation => {
      const categoryNonNullValues = categoryValues.filter((v) => !Objects.isEmpty(v))
      const sum = Numbers.sum(categoryNonNullValues)

      const valid = categoryValues.some(Objects.isEmpty) || Objects.isEmpty(maxValue) || Numbers.eq(sum, maxValue)

      if (valid) {
        return { valid }
      }

      const messages: Array<NodeValueValidationMessage> = [
        {
          validatorName: validatorSumEqualTo.name,
          key: 'generalValidation.sumEqualTo',
          params: {
            categoryLabelKeys,
            categoriesSum: Numbers.toFixed(sum),
            maxValue: Numbers.toFixed(maxValue),
          },
        },
      ]

      return { valid, messages }
    }
  },
}
