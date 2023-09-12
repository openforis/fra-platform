import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToTotalGrowingStock: ExpressionFunction<Context> = {
  name: 'validatorEqualToTotalGrowingStock',
  minArity: 2,
  executor: () => {
    return (forestGrowingStock?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(value) ||
        Numbers.eq(forestGrowingStock, 0) ||
        !Numbers.greaterThan(Numbers.abs(Numbers.sub(forestGrowingStock, value)), 1)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.mustBeEqualToTotalGrowingStock' }]

      return { valid, messages }
    }
  },
}
