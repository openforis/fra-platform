import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorForestAreaNetChange: ExpressionFunction<Context> = {
  name: 'validatorForestAreaNetChange',
  minArity: 2,
  executor: () => {
    return (forestArea?: string, forestAreaNetChange?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) ||
        Objects.isEmpty(forestAreaNetChange) ||
        Numbers.lessThanOrEqualTo(Numbers.abs(Numbers.sub(forestAreaNetChange, forestArea)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'extentOfForest.forestAreaNetChangeDoesNotMatch',
              params: { value: Numbers.toFixed(Numbers.toBigNumber(forestArea)) },
            },
          ]

      return { valid, messages }
    }
  },
}
