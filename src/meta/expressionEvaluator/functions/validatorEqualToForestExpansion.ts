import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorEqualToForestExpansion: ExpressionFunction<Context> = {
  name: 'validatorEqualToForestExpansion',
  minArity: 2,
  executor: () => {
    return (forestExpansion?: string, subCategoryValues?: Array<string>): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestExpansion) ||
        Numbers.eq(forestExpansion, 0) ||
        Numbers.eq(forestExpansion, Numbers.sum(subCategoryValues.filter((val) => !Objects.isEmpty(val))))

      const messages: Array<NodeValueValidationMessage> = valid ? undefined : [{ key: 'generalValidation.mustBeEqualToForestExpansion' }]

      return { valid, messages }
    }
  },
}
