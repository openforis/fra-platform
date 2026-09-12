import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToPlantedForest: ExpressionFunction<Context> = {
  name: ValidatorName.equalToPlantedForest,
  minArity: 2,
  executor: () => {
    return (plantedForest?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        !subCategoryValues?.every(Boolean) ||
        Numbers.eq(plantedForest, 0) ||
        Numbers.eq(plantedForest, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ name: ValidatorName.equalToPlantedForest, key: 'generalValidation.mustBeEqualToPlantedForest' }]

      return { valid, messages }
    }
  },
}
