import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThanMaxForest: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanMaxForest',
  minArity: 2,
  executor: () => {
    return (maxForestArea?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(maxForestArea) ||
        Objects.isEmpty(value) ||
        Numbers.greaterThanWithTolerance(maxForestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              validatorName: validatorNotGreaterThanMaxForest.name,
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
              params: { maxForestArea: Numbers.toFixed(maxForestArea) },
            },
          ]

      return { valid, messages }
    }
  },
}
