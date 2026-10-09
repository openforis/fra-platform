import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorOtherLand: ExpressionFunction<Context> = {
  name: ValidatorName.otherLand,
  minArity: 2,
  executor: () => {
    return (otherLand?: string, totalLandArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(otherLand) || Objects.isEmpty(totalLandArea) || Numbers.greaterThanOrEqualTo(otherLand, 0)
      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.otherLand, key: 'extentOfForest.fedAreasExceedTotalLandArea' }]

      return { valid, messages }
    }
  },
}
