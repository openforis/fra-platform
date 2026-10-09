import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorIsYear: ExpressionFunction<Context> = {
  name: ValidatorName.isYear,
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || /^[12][0-9]{3}$/.test(value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.isYear, key: 'generalValidation.valueMustBeYear' }]

      return { valid, messages }
    }
  },
}
