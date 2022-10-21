import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorSubCategory: ExpressionFunction<Context> = {
  name: 'validatorSubCategory',
  minArity: 2,
  executor: () => {
    return (categoryValue?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Objects.isEmpty(categoryValue) ||
        Numbers.greaterThanWithTolerance(
          categoryValue,
          Numbers.sum(subCategoryValues?.filter((v) => !Objects.isEmpty(v))) ?? 0
        )

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.subCategoryExceedsParent' }]

      return { valid, messages }
    }
  },
}
