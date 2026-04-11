import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorTotalForest: ExpressionFunction<Context> = {
  name: ValidatorName.totalForest,
  minArity: 2,
  executor: () => {
    return (forestArea?: string, totalForestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) ||
        Objects.isEmpty(totalForestArea) ||
        !Numbers.greaterThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea, totalForestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.totalForest, key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest' }]

      return { valid, messages }
    }
  },
}
