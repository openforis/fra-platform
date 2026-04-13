import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { validatorNotGreaterThanLandArea } from 'meta/expressionEvaluator/functions/validatorNotGreaterThanLandArea'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThanLandAreaOrMaxLandArea: ExpressionFunction<Context> = {
  name: ValidatorName.notGreaterThanLandAreaOrMaxLandArea,
  minArity: 2,
  executor: (context) => {
    return (landArea?: string, value?: string, maxLandArea?: string): NodeValueValidation => {
      if (landArea) return validatorNotGreaterThanLandArea.executor(context)(landArea, value)
      const valid =
        Objects.isEmpty(maxLandArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(maxLandArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.notGreaterThanLandAreaOrMaxLandArea,
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForLandArea',
              params: { maxLandArea: Numbers.toFixed(maxLandArea) },
            },
          ]
      return { valid, messages }
    }
  },
}
