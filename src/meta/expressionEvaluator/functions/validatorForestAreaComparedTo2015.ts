import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorForestAreaComparedTo2015: ExpressionFunction<Context> = {
  name: ValidatorName.forestAreaComparedTo2015,
  minArity: 2,
  executor: () => {
    return (forestArea2015?: string, forestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea2015) ||
        Objects.isEmpty(forestArea) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea2015, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.forestAreaComparedTo2015,
              key: 'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
              params: { previous: forestArea2015, year: '2015' },
            },
          ]

      return { valid, messages }
    }
  },
}
