import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorPlantationForestIntroduced: ExpressionFunction<Context> = {
  name: 'validatorPlantationForestIntroduced',
  minArity: 2,
  executor: () => {
    return (plantationForestArea?: string, plantationForestIntroducedArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(plantationForestArea) ||
        Objects.isEmpty(plantationForestIntroducedArea) ||
        Numbers.greaterThan(Numbers.sub(plantationForestArea, plantationForestIntroducedArea), -1)

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.subCategoryExceedsParent' }]

      return { valid, messages }
    }
  },
}
