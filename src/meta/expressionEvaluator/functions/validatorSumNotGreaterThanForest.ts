import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorSumNotGreaterThanForest: ExpressionFunction<Context> = {
  name: ValidatorName.sumNotGreaterThanForest,
  minArity: 2,
  executor: () => {
    return (
      forestArea?: string,
      value?: string,
      _messages?: Array<NodeValueValidationMessage>
    ): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(forestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : (_messages ?? [
            {
              name: ValidatorName.sumNotGreaterThanForest,
              key: 'generalValidation.forestSumAreaExceedsExtentOfForest',
            },
          ])

      return { valid, messages }
    }
  },
}
