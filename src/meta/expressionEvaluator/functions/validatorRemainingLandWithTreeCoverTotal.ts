import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { validatorSubCategory } from 'meta/expressionEvaluator/functions/validatorSubCategory'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorRemainingLandWithTreeCoverTotal: ExpressionFunction<Context> = {
  name: ValidatorName.remainingLandWithTreeCoverTotal,
  minArity: 2,
  executor: (context) => {
    return (categoryValues?: Array<string>, remainingLand?: string): NodeValueValidation => {
      return validatorSubCategory.executor(context)(remainingLand, categoryValues, undefined, [
        {
          name: ValidatorName.remainingLandWithTreeCoverTotal,
          key: 'generalValidation.remainingLandExceedsExtentOfForest',
        },
      ])
    }
  },
}
