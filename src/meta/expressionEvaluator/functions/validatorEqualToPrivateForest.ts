import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToPrivateForest: ExpressionFunction<Context> = {
  name: 'validatorEqualToPrivateForest',
  minArity: 2,
  executor: () => {
    return (privateOwnership?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Numbers.eq(privateOwnership, 0) ||
        subCategoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eq(privateOwnership, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.mustBeEqualToPrivateForest' }]

      return { valid, messages }
    }
  },
}
