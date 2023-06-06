import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSumNotGreaterThan: ExpressionFunction<Context> = {
  name: 'validatorSumNotGreaterThan',
  minArity: 2,
  executor: () => {
    return (value?: string, maxValue?: string, tolerance?: boolean): NodeValueValidation => {
      const valid =
        Objects.isEmpty(value) ||
        Objects.isEmpty(maxValue) ||
        (tolerance ? Numbers.greaterThanWithTolerance(maxValue, value) : !Numbers.greaterThan(value, maxValue))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.sumNotGreaterThan', params: { maxValue: Numbers.toFixed(maxValue) } }]

      return { valid, messages }
    }
  },
}
