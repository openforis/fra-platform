import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorGreaterThanOrZero: ExpressionFunction<Context> = {
  name: 'validatorGreaterThanOrZero',
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
