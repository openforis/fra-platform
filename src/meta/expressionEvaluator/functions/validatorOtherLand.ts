import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorOtherLand: ExpressionFunction<Context> = {
  name: 'validatorOtherLand',
  minArity: 2,
  executor: () => {
    return (otherLand?: string, totalLandArea?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(otherLand) || Objects.isEmpty(totalLandArea) || Numbers.greaterThanOrEqualTo(otherLand, 0)
      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'extentOfForest.fedAreasExceedTotalLandArea' }]

      return { valid, messages }
    }
  },
}
