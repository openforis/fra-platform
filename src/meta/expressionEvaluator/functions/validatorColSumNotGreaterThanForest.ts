import { NodeValueValidation } from 'meta/assessment/nodeValueValidation'
import { validatorSumNotGreaterThanForest } from 'meta/expressionEvaluator/functions/validatorSumNotGreaterThanForest'
import { Numbers } from 'utils/numbers'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorColSumNotGreaterThanForest: ExpressionFunction<Context> = {
  name: 'validatorColSumNotGreaterThanForest',
  minArity: 2,
  executor: (context) => {
    return (value?: string, maxValue?: string): NodeValueValidation => {
      return validatorSumNotGreaterThanForest.executor(context)(maxValue, value, [
        {
          validatorName: validatorColSumNotGreaterThanForest.name,
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
