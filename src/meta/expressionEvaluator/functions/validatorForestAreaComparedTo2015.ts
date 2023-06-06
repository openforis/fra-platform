import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorForestAreaComparedTo2015: ExpressionFunction<Context> = {
  name: 'validatorForestAreaComparedTo2015',
  minArity: 2,
  executor: () => {
    return (forestArea2015?: string, forestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea2015) ||
        Objects.isEmpty(forestArea) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea2015, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
              params: { previous: forestArea2015, year: '2015' },
            },
          ]

      return { valid, messages }
    }
  },
}
