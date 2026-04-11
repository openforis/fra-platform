import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorForestAreaComparedTo2020: ExpressionFunction<Context> = {
  name: ValidatorName.forestAreaComparedTo2020,
  minArity: 2,
  executor: () => {
    return (forestArea2020?: string, forestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea2020) ||
        Objects.isEmpty(forestArea) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea2020, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.forestAreaComparedTo2020,
              key: 'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
              params: { previous: forestArea2020, year: '2020' },
            },
          ]

      return { valid, messages }
    }
  },
}
