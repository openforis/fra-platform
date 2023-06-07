import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { NodeValueValidation } from 'meta/assessment'
import { validatorNotGreaterThanForest } from 'meta/expressionEvaluator/functions/validatorNotGreaterThanForest'

import { Context } from '../context'
import { validatorNotGreaterThanMaxForest } from './validatorNotGreaterThanMaxForest'

export const validatorNotGreaterThanForestOrMaxForest: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanForestOrMaxForest',
  minArity: 3,
  executor: (context) => {
    return (forestArea?: string, value?: string, maxForestArea?: string): NodeValueValidation => {
      if (forestArea) return validatorNotGreaterThanForest.executor(context)(forestArea, value)
      return validatorNotGreaterThanMaxForest.executor(context)(maxForestArea, value)
    }
  },
}
