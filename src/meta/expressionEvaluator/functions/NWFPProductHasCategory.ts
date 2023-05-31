import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const NWFPProductHasCategory: ExpressionFunction<Context> = {
  name: 'NWFPProductHasCategory',
  minArity: 1,
  executor: () => {
    return (name?: string, category?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(name) || !Objects.isEmpty(category)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [{ key: 'generalValidation.columnEmpty', params: { columName: 'nonWoodForestProductsRemovals.category' } }]

      return { valid, messages }
    }
  },
}
