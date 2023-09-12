import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'
import { validatorNotGreaterThanLandArea } from 'meta/expressionEvaluator/functions/validatorNotGreaterThanLandArea'

import { Context } from '../context'

export const validatorNotGreaterThanLandAreaOrMaxLandArea: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanLandAreaOrMaxLandArea',
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
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForLandArea',
              params: { maxLandArea: Numbers.toFixed(maxLandArea) },
            },
          ]
      return { valid, messages }
    }
  },
}
