import { Numbers, Objects } from '@core/utils'
import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorPrimaryForest: ExpressionFunction<Context> = {
  name: 'validatorPrimaryForest',
  minArity: 2,
  executor: () => {
    return (primaryForest?: string, naturalForestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(primaryForest) ||
        Objects.isEmpty(naturalForestArea) ||
        Numbers.greaterThanWithTolerance(naturalForestArea, primaryForest)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'specificForestCategories.exceedsNaturallyRegeneratingForest' }]

      return { valid, messages }
    }
  },
}
