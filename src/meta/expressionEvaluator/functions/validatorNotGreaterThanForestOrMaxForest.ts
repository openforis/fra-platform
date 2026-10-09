import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { validatorNotGreaterThanForest } from 'meta/expressionEvaluator/functions/validatorNotGreaterThanForest'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'
import { validatorNotGreaterThanMaxForest } from './validatorNotGreaterThanMaxForest'

export const validatorNotGreaterThanForestOrMaxForest: ExpressionFunction<Context> = {
  name: ValidatorName.notGreaterThanForestOrMaxForest,
  minArity: 3,
  executor: (context) => {
    return (forestArea?: string, value?: string, maxForestArea?: string): NodeValueValidation => {
      if (forestArea) return validatorNotGreaterThanForest.executor(context)(forestArea, value)
      return validatorNotGreaterThanMaxForest.executor(context)(maxForestArea, value)
    }
  },
}
