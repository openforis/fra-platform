import { ExpressionFunction } from 'lib/expressionEvaluator/function'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'

import { Context } from '../context'

export const validatorNWFPProductAndCategory: ExpressionFunction<Context> = {
  name: 'validatorNWFPProductAndCategory',
  minArity: 2,
  executor: () => {
    return (value: string, rowValues: Array<string>): NodeValueValidation => {
      const valid = rowValues.every(Objects.isEmpty) || !Objects.isEmpty(value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.columnEmpty', params: { columName: 'nonWoodForestProductsRemovals.category' } }]

      return { valid, messages }
    }
  },
}
