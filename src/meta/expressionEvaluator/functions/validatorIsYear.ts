import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorIsYear: ExpressionFunction<Context> = {
  name: 'validatorIsYear',
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || /^[12][0-9]{3}$/.test(value)

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.valueMustBeYear' }]

      return { valid, messages }
    }
  },
}
