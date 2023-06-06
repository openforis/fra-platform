import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorNotEmpty: ExpressionFunction<Context> = {
  name: 'validatorNotEmpty',
  minArity: 1,
  executor: () => {
    return (value?: string, decimalValues?: Array<number>): NodeValueValidation => {
      const shouldCheckEmpty = decimalValues && decimalValues.length > 0 && decimalValues.some((val) => val !== null && val !== undefined)

      const isEmpty = shouldCheckEmpty ? Objects.isEmpty(value) : false
      const valid = !isEmpty

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.notEmpty' }]

      return { valid, messages }
    }
  },
}
