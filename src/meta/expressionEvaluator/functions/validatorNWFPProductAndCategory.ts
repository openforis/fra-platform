import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNWFPProductAndCategory: ExpressionFunction<Context> = {
  name: ValidatorName.nwfpProductAndCategory,
  minArity: 2,
  executor: () => {
    return (value: string, rowValues: Array<string>): NodeValueValidation => {
      const valid = rowValues.every(Objects.isEmpty) || !Objects.isEmpty(value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.nwfpProductAndCategory,
              key: 'generalValidation.columnEmpty',
              params: { columName: { key: 'nonWoodForestProductsRemovals.category' } },
            },
          ]

      return { valid, messages }
    }
  },
}
