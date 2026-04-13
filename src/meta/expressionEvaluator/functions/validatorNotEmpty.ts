import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotEmpty: ExpressionFunction<Context> = {
  name: ValidatorName.notEmpty,
  minArity: 1,
  executor: () => {
    return (value?: string, decimalValues?: Array<number>): NodeValueValidation => {
      const shouldCheckEmpty =
        decimalValues && decimalValues.length > 0 && decimalValues.some((val) => val !== null && val !== undefined)

      const isEmpty = shouldCheckEmpty ? Objects.isEmpty(value) : false
      const valid = !isEmpty

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.notEmpty, key: 'generalValidation.notEmpty' }]

      return { valid, messages }
    }
  },
}
