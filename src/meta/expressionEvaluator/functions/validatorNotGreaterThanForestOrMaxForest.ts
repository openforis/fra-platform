import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'
import { validatorNotGreaterThanForest } from '@meta/expressionEvaluator/functions/validatorNotGreaterThanForest'

import { Context } from '../context'

export const validatorNotGreaterThanForestOrMaxForest: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanForestOrMaxForest',
  minArity: 3,
  executor: (context) => {
    return (forestArea?: string, value?: string, maxForestArea?: string): NodeValueValidation => {
      if (forestArea) return validatorNotGreaterThanForest.executor(context)(forestArea, value)

      const valid =
        Objects.isEmpty(maxForestArea) ||
        Objects.isEmpty(value) ||
        Numbers.greaterThanWithTolerance(maxForestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
              params: { maxForestArea: Numbers.toFixed(maxForestArea) },
            },
          ]

      return { valid, messages }
    }
  },
}
