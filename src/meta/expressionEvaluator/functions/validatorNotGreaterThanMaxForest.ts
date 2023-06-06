import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

export const validatorNotGreaterThanMaxForest: ExpressionFunction<Context> = {
  name: 'validatorNotGreaterThanMaxForest',
  minArity: 2,
  executor: () => {
    return (maxForestArea?: string, value?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(maxForestArea) ||
        Objects.isEmpty(value) ||
        Numbers.greaterThanWithTolerance(maxForestArea, value)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestArea',
              params: { maxForestArea: Numbers.toFixed(maxForestArea) },
            },
          ]

      return { valid, messages }
    }
  },
}
