import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorForestAreaNetChange: ExpressionFunction<Context> = {
  name: 'validatorForestAreaNetChange',
  minArity: 2,
  executor: () => {
    return (forestArea?: string, forestAreaNetChange?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) ||
        Objects.isEmpty(forestAreaNetChange) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestAreaNetChange, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              validatorName: validatorForestAreaNetChange.name,
              key: 'extentOfForest.forestAreaNetChangeDoesNotMatch',
              params: { value: Numbers.toFixed(Numbers.toBigNumber(forestArea)) },
            },
          ]

      return { valid, messages }
    }
  },
}
