import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorEqualToForestExpansion: ExpressionFunction<Context> = {
  name: ValidatorName.equalToForestExpansion,
  minArity: 2,
  executor: () => {
    return (forestExpansion?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestExpansion) ||
        Numbers.eq(forestExpansion, 0) ||
        Numbers.eq(forestExpansion, Numbers.sum(subCategoryValues.filter((val) => !Objects.isEmpty(val))))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.equalToForestExpansion,
              key: 'generalValidation.mustBeEqualToForestExpansion',
            },
          ]

      return { valid, messages }
    }
  },
}
