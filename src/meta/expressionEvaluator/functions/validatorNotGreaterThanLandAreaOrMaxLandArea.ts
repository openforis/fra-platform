import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { NodeValueValidation } from '@meta/assessment'
import { validatorNotGreaterThanLandArea } from '@meta/expressionEvaluator/functions/validatorNotGreaterThanLandArea'

import { Context } from '../context'
import { validatorNotGreaterThanMaxForest } from './validatorNotGreaterThanMaxForest'

export const validatorNotGreaterThanLandAreaOrMaxLandArea: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanLandAreaOrMaxLandArea',
  minArity: 2,
  executor: (context) => {
    return (landArea?: string, value?: string, maxLandArea?: string): NodeValueValidation => {
      if (landArea) return validatorNotGreaterThanLandArea.executor(context)(landArea, value)
      return validatorNotGreaterThanMaxForest.executor(context)(maxLandArea, value)
    }
  },
}
