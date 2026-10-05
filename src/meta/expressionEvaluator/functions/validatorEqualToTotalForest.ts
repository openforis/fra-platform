import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToTotalForest: ExpressionFunction<Context> = {
  name: ValidatorName.equalToTotalForest,
  minArity: 2,
  executor: () => {
    return (totalForestArea?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Objects.isEmpty(totalForestArea) ||
        !subCategoryValues?.every(Boolean) ||
        !Numbers.greaterThan(Numbers.abs(Numbers.sub(totalForestArea, Numbers.sum(subCategoryValues))), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.equalToTotalForest, key: 'generalValidation.mustBeEqualToForestArea' }]

      return { valid, messages }
    }
  },
}
