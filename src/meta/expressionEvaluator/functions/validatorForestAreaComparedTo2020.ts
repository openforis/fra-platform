import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorForestAreaComparedTo2020: ExpressionFunction<Context> = {
  name: 'validatorForestAreaComparedTo2020',
  minArity: 2,
  executor: () => {
    return (forestArea2020?: string, forestArea?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea2020) ||
        Objects.isEmpty(forestArea) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestArea2020, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'extentOfForest.forestAreaDoesNotMatchPreviouslyReported',
              params: { previous: forestArea2020, year: '2020' },
            },
          ]

      return { valid, messages }
    }
  },
}
