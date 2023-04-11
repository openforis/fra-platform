import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorNotEmpty: ExpressionFunction<Context> = {
  name: 'validatorNotEmpty',
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const isEmpty = Objects.isEmpty(value)
      const valid = !isEmpty // Invert the result of isEmpty

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.notEmpty' }]

      return { valid, messages }
    }
  },
}
