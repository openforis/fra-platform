import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThanForest: ExpressionFunction<Context> = {
  name: ValidatorName.notGreaterThanForest,
  minArity: 2,
  executor: () => {
    return (forestArea?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(forestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.notGreaterThanForest,
              key: 'generalValidation.forestAreaExceedsExtentOfForest',
              params: { value: Numbers.toFixed(forestArea) },
            },
          ]

      return { valid, messages }
    }
  },
}
