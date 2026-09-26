import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToTotalGrowingStock: ExpressionFunction<Context> = {
  name: ValidatorName.equalToTotalGrowingStock,
  minArity: 2,
  executor: () => {
    return (forestGrowingStock?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(value) ||
        Numbers.eq(forestGrowingStock, 0) ||
        !Numbers.greaterThan(Numbers.abs(Numbers.sub(forestGrowingStock, value)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.equalToTotalGrowingStock,
              key: 'generalValidation.mustBeEqualToTotalGrowingStock',
            },
          ]

      return { valid, messages }
    }
  },
}
