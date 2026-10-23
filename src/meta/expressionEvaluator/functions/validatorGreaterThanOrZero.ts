import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorGreaterThanOrZero: ExpressionFunction<Context> = {
  name: ValidatorName.greaterThanOrZero,
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || Numbers.greaterThanOrEqualTo(value, 0)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.greaterThanOrZero, key: 'generalValidation.valueMustBePositive' }]

      return { valid, messages }
    }
  },
}
