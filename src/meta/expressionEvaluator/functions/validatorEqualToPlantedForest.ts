import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToPlantedForest: ExpressionFunction<Context> = {
  name: 'validatorEqualToPlantedForest',
  minArity: 2,
  executor: () => {
    return (plantedForest?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        !subCategoryValues?.every(Boolean) ||
        Numbers.eq(plantedForest, 0) ||
        Numbers.eq(plantedForest, Numbers.sum(subCategoryValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.mustBeEqualToPlantedForest' }]

      return { valid, messages }
    }
  },
}
