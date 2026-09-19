import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThanMaxForest: ExpressionFunction<Context> = {
  name: ValidatorName.notGreaterThanMaxForest,
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
              name: ValidatorName.notGreaterThanMaxForest,
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
              params: { maxForestArea: Numbers.toFixed(maxForestArea) },
            },
          ]

      return { valid, messages }
    }
  },
}
