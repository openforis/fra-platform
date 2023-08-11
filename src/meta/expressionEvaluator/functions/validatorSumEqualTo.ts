import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSumEqualTo: ExpressionFunction<Context> = {
  name: 'validatorSumEqualTo',
  minArity: 2,
  executor: () => {
    return (values?: Array<string>, maxValue?: string): NodeValueValidation => {
      const sum = Numbers.sum(values)
      const valid = values.some((v) => Objects.isEmpty(v)) || Objects.isEmpty(maxValue) || Numbers.eq(sum, maxValue)

      if (valid) {
        return { valid }
      }

      const messages: Array<NodeValueValidationMessage> = [
        {
          key: 'generalValidation.sumEqualTo',
          params: { value: Numbers.toFixed(sum), maxValue: Numbers.toFixed(maxValue) },
        },
      ]

      return { valid, messages }
    }
  },
}
