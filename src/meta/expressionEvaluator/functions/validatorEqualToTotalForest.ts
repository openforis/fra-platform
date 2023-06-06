import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToTotalForest: ExpressionFunction<Context> = {
  name: 'validatorEqualToTotalForest',
  minArity: 2,
  executor: () => {
    return (totalForestArea?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Objects.isEmpty(totalForestArea) ||
        !subCategoryValues?.every(Boolean) ||
        !Numbers.greaterThan(Numbers.abs(Numbers.sub(totalForestArea, Numbers.sum(subCategoryValues))), 1)

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.mustBeEqualToForestArea' }]

      return { valid, messages }
    }
  },
}
