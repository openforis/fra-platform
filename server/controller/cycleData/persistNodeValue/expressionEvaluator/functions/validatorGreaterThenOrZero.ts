import { Numbers, Objects } from '@core/utils'
import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorGreaterThenOrZero: ExpressionFunction<Context> = {
  name: 'validatorGreaterThenOrZero',
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || Numbers.greaterThanOrEqualTo(value, 0)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.valueMustBePositive' }]

      return { valid, messages }
    }
  },
}
