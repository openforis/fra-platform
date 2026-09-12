import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorPlantationForestIntroduced: ExpressionFunction<Context> = {
  name: ValidatorName.plantationForestIntroduced,
  minArity: 2,
  executor: () => {
    return (plantationForestArea?: string, plantationForestIntroducedArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(plantationForestArea) ||
        Objects.isEmpty(plantationForestIntroducedArea) ||
        Numbers.greaterThan(Numbers.sub(plantationForestArea, plantationForestIntroducedArea), -1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.plantationForestIntroduced,
              key: 'generalValidation.subCategoryExceedsParent',
            },
          ]

      return { valid, messages }
    }
  },
}
