import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorSubCategory: ExpressionFunction<Context> = {
  name: ValidatorName.subCategory,
  minArity: 2,
  executor: () => {
    return (categoryValue?: string, subCategoryValues?: Array<string>, tolerance?: number): NodeValueValidation => {
      const nonEmptySubCategoryValues = subCategoryValues?.filter((v) => !Objects.isEmpty(v))
      const valid =
        Objects.isEmpty(categoryValue) ||
        nonEmptySubCategoryValues.length === 0 ||
        Numbers.greaterThanWithTolerance(categoryValue, Numbers.sum(nonEmptySubCategoryValues), tolerance)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.subCategory, key: 'generalValidation.subCategoryExceedsParent' }]

      return { valid, messages }
    }
  },
}
