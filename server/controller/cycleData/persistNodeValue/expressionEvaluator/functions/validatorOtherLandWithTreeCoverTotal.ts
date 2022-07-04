import { Numbers, Objects } from '@core/utils'
import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorOtherLandWithTreeCoverTotal: ExpressionFunction<Context> = {
  name: 'validatorOtherLandWithTreeCoverTotal',
  minArity: 2,
  executor: () => {
    return (otherLand?: string, otherLandWithTreeCoverTotal?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(otherLand) ||
        Objects.isEmpty(otherLandWithTreeCoverTotal) ||
        Numbers.greaterThanWithTolerance(otherLand, otherLandWithTreeCoverTotal)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.otherLandExceedsExtentOfForest' }]

      return { valid, messages }
    }
  },
}
