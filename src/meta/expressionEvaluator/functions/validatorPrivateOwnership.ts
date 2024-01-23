import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorPrivateOwnership: ExpressionFunction<Context> = {
  name: 'validatorPrivateOwnership',
  minArity: 2,
  executor: () => {
    return (privateOwnership?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const emptyValues = subCategoryValues.filter((value) => Objects.isEmpty(value))

      let valid =
        emptyValues.length === subCategoryValues.length ||
        Objects.isEmpty(privateOwnership) ||
        Numbers.eq(privateOwnership, 0) ||
        emptyValues.length === 2
      let key = ''

      if (!valid) {
        if (emptyValues.length === 1) {
          valid = Numbers.lessThan(Numbers.sum(subCategoryValues), privateOwnership)
          key = 'generalValidation.mustBeLessThanPrivateOwnership'
        } else {
          valid = Numbers.eqWithTolerance(privateOwnership, Numbers.sum(subCategoryValues))
          key = 'generalValidation.mustBeEqualToPrivateOwnership'
        }
      }

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key }]

      return { valid, messages }
    }
  },
}
