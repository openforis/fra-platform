import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToPrivateForest: ExpressionFunction<Context> = {
  name: ValidatorName.equalToPrivateForest,
  minArity: 2,
  executor: () => {
    return (privateOwnership?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Numbers.eq(privateOwnership, 0) ||
        subCategoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eq(privateOwnership, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.equalToPrivateForest, key: 'generalValidation.mustBeEqualToPrivateForest' }]

      return { valid, messages }
    }
  },
}
