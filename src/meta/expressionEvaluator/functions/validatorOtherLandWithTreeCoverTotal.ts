import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorOtherLandWithTreeCoverTotal: ExpressionFunction<Context> = {
  name: 'validatorOtherLandWithTreeCoverTotal',
  minArity: 2,
  executor: () => {
    return (otherLand?: string, otherLandWithTreeCoverTotal?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(otherLand) ||
        Objects.isEmpty(otherLandWithTreeCoverTotal) ||
        Numbers.greaterThanWithTolerance(otherLandWithTreeCoverTotal, otherLand)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              validatorName: validatorOtherLandWithTreeCoverTotal.name,
              key: 'generalValidation.otherLandExceedsExtentOfForest',
            },
          ]

      return { valid, messages }
    }
  },
}
