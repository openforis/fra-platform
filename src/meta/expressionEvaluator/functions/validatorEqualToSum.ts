import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToSum: ExpressionFunction<Context> = {
  name: 'validatorEqualToSum',
  minArity: 2,
  executor: () => {
    return (
      value: string,
      otherValues: Array<string>,
      parentVariable = 'parent',
      col = '',
      table = '',
      subcategories = ''
    ): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || Numbers.eqWithTolerance(value, Numbers.sum(otherValues?.filter((v) => !Objects.isEmpty(v))))

      const valueRounded = parseFloat(value).toFixed(2)
      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'generalValidation.valueEqualToSumParent',
              params: { parentVariable, subcategories, parentCol: col, parentTable: table, valueRounded },
            },
          ]

      return { valid, messages }
    }
  },
}
