import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorSumNotGreaterThan: ExpressionFunction<Context> = {
  name: ValidatorName.sumNotGreaterThan,
  minArity: 2,
  executor: () => {
    return (value?: string, maxValue?: string, tolerance?: boolean): NodeValueValidation => {
      const valid =
        Objects.isEmpty(value) ||
        Objects.isEmpty(maxValue) ||
        (tolerance ? Numbers.greaterThanWithTolerance(maxValue, value) : !Numbers.greaterThan(value, maxValue))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.sumNotGreaterThan,
              key: 'generalValidation.sumNotGreaterThan',
              params: { maxValue: Numbers.toFixed(maxValue) },
            },
          ]

      return { valid, messages }
    }
  },
}
