import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSumEqualTo: ExpressionFunction<Context> = {
  name: 'validatorSumEqualTo',
  minArity: 2,
  executor: ({ t }) => {
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
          key: 'generalValidation.sumEqualTo',
          params: {
            categoryLabels: categoryLabelKeys.map((labelKey) => t<string>(labelKey)).join(', '),

            categoriesSum: Numbers.toFixed(sum),
            maxValue: Numbers.toFixed(maxValue),
          },
        },
      ]

      return { valid, messages }
    }
  },
}
