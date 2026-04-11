import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToPrimaryForest: ExpressionFunction<Context> = {
  name: ValidatorName.equalToPrimaryForest,
  minArity: 2,
  executor: () => {
    return (primaryForestArea?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Numbers.eq(primaryForestArea, 0) ||
        subCategoryValues.some((value) => Objects.isEmpty(value)) ||
        Numbers.eqWithTolerance(primaryForestArea, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.equalToPrimaryForest, key: 'generalValidation.mustBeEqualToPrimaryForest' }]

      return { valid, messages }
    }
  },
}
