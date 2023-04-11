import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorNotEmpty: ExpressionFunction<Context> = {
  name: 'validatorNotEmpty',
  minArity: 2,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.sumNotGreaterThan' }]

      return { valid, messages }
    }
  },
}
