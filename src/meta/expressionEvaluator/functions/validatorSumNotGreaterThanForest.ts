import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorSumNotGreaterThanForest: ExpressionFunction<Context> = {
  name: 'validatorSumNotGreaterThanForest',
  minArity: 2,
  executor: () => {
    return (forestArea?: string, value?: string, _messages?: Array<NodeValueValidationMessage>): NodeValueValidation => {
      const valid = Objects.isEmpty(forestArea) || Objects.isEmpty(value) || Numbers.greaterThanWithTolerance(forestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : _messages ?? [{ key: 'generalValidation.forestSumAreaExceedsExtentOfForest' }]

      return { valid, messages }
    }
  },
}
