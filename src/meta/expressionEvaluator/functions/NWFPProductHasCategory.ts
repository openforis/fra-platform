import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const NWFPProductHasCategory: ExpressionFunction<Context> = {
  name: ValidatorName.nwfpProductHasCategory,
  minArity: 1,
  executor: () => {
    return (name?: string, category?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(name) || !Objects.isEmpty(category)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.nwfpProductHasCategory,
              key: 'generalValidation.columnEmpty',
              params: { columName: { key: 'nonWoodForestProductsRemovals.category' } },
            },
          ]

      return { valid, messages }
    }
  },
}
