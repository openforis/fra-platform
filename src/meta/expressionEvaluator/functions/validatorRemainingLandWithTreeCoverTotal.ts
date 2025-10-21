import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ExpressionFunction } from 'meta/expressions/function'

import { Context } from '../context'

export const validatorRemainingLandWithTreeCoverTotal: ExpressionFunction<Context> = {
  name: 'validatorRemainingLandWithTreeCoverTotal',
  minArity: 2,
  executor: () => {
    return (remainingLand?: string, otherLandWithTreeCoverTotal?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(remainingLand) ||
        Objects.isEmpty(otherLandWithTreeCoverTotal) ||
        Numbers.greaterThanWithTolerance(otherLandWithTreeCoverTotal, remainingLand)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.remainingLandExceedsExtentOfForest' }]

      return { valid, messages }
    }
  },
}
