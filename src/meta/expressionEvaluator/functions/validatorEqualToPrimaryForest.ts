import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToPrimaryForest: ExpressionFunction<Context> = {
  name: 'validatorEqualToPrimaryForest',
  minArity: 2,
  executor: () => {
    return (primaryForestArea?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Numbers.eq(primaryForestArea, 0) ||
        subCategoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eqWithTolerance(primaryForestArea, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.mustBeEqualToPrimaryForest' }]

      return { valid, messages }
    }
  },
}
