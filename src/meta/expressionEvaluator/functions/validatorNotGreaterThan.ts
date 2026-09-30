import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThan: ExpressionFunction<Context> = {
  name: ValidatorName.notGreaterThan,
  minArity: 2,
  executor: () => {
    return (value?: string, maxValue?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || !Numbers.greaterThan(value, maxValue)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.notGreaterThan,
              key: 'generalValidation.valueNotGreaterThan',
              params: { maxValue },
            },
          ]

      return { valid, messages }
    }
  },
}
