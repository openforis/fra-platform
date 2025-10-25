import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNotGreaterThanLandArea: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanLandArea',
  minArity: 2,
  executor: () => {
    return (landArea?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(landArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(landArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.landAreaExceedsTotalLandArea', params: { value: Numbers.toFixed(landArea) } }]

      return { valid, messages }
    }
  },
}
