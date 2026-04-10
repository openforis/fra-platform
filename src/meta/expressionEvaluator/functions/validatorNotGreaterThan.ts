import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThan: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThan',
  minArity: 2,
  executor: () => {
    return (value?: string, maxValue?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || !Numbers.greaterThan(value, maxValue)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              validatorName: validatorNotGreaterThan.name,
              key: 'generalValidation.valueNotGreaterThan',
              params: { maxValue },
            },
          ]

      return { valid, messages }
    }
  },
}
