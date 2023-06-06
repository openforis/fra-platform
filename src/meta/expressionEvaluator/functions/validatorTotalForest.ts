import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorTotalForest: ExpressionFunction<Context> = {
  name: 'validatorTotalForest',
  minArity: 2,
  executor: () => {
    return (forestArea?: string, totalForestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) ||
        Objects.isEmpty(totalForestArea) ||
        !Numbers.greaterThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea, totalForestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.forestAreaDoesNotMatchExtentOfForest' }]

      return { valid, messages }
    }
  },
}
