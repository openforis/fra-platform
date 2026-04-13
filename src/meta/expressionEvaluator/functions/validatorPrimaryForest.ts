import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorPrimaryForest: ExpressionFunction<Context> = {
  name: ValidatorName.primaryForest,
  minArity: 2,
  executor: () => {
    return (primaryForest?: string, naturalForestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(primaryForest) ||
        Objects.isEmpty(naturalForestArea) ||
        Numbers.greaterThanWithTolerance(naturalForestArea, primaryForest)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.primaryForest,
              key: 'specificForestCategories.exceedsNaturallyRegeneratingForest',
            },
          ]

      return { valid, messages }
    }
  },
}
