import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { validatorSumNotGreaterThanForest } from 'meta/expressionEvaluator/functions/validatorSumNotGreaterThanForest'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorColSumNotGreaterThanForest: ExpressionFunction<Context> = {
  name: ValidatorName.colSumNotGreaterThanForest,
  minArity: 2,
  executor: (context) => {
    return (value?: string, maxValue?: string): NodeValueValidation => {
      return validatorSumNotGreaterThanForest.executor(context)(maxValue, value, [
        {
          name: ValidatorName.colSumNotGreaterThanForest,
          key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestAreaYear',
          params: {
            maxForestArea: Numbers.toFixed(maxValue),
            year: context.colName,
          },
        },
      ])
    }
  },
}
