import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorNotGreaterThanForest: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanForest',
  minArity: 2,
  executor: () => {
    return (forestArea?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(forestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.forestAreaExceedsExtentOfForest', params: { value: Numbers.toFixed(forestArea) } }]

      return { valid, messages }
    }
  },
}
