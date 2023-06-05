import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSubCategory: ExpressionFunction<Context> = {
  name: 'validatorSubCategory',
  minArity: 2,
  executor: () => {
    return (categoryValue?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const nonEmptySubCategoryValues = subCategoryValues?.filter((v) => !Objects.isEmpty(v))

      const valid =
        (Objects.isEmpty(categoryValue) && nonEmptySubCategoryValues.length === 0) ||
        !subCategoryValues?.every(Boolean) ||
        Numbers.greaterThanWithTolerance(categoryValue, Numbers.sum(nonEmptySubCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.subCategoryExceedsParent' }]

      return { valid, messages }
    }
  },
}
