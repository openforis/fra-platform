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
      maxValue: string,
      index: number
    ): NodeValueValidation => {
      const categoryLabelKeysFiltered = categoryLabelKeys.filter((_v, i) => !Objects.isEmpty(categoryValues[i]))
      const categoryValuesFiltered = categoryValues.filter((v) => !Objects.isEmpty(v))
      const categoryNonNullValues = categoryValuesFiltered.filter((v) => !Objects.isEmpty(v))

      const sum = Numbers.sum(categoryNonNullValues)

      const valid = Objects.isEmpty(categoryValues[index]) || Objects.isEmpty(maxValue) || Numbers.eq(sum, maxValue)

      if (valid) {
        return { valid }
      }

      const messages: Array<NodeValueValidationMessage> = [
        {
          key: 'generalValidation.sumEqualTo',
          params: {
            categoryLabels: categoryLabelKeysFiltered.map((labelKey) => t<string>(labelKey)).join(', '),

            categoriesSum: Numbers.toFixed(sum),
            maxValue: Numbers.toFixed(maxValue),
          },
        },
      ]

      return { valid, messages }
    }
  },
}
