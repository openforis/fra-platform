import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from '@utils/numbers'
import { Objects } from '@utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from '@meta/assessment'

import { Context } from '../context'

export const validatorColSumNotGreaterThanForest: ExpressionFunction<Context> = {
  name: 'validatorColSumNotGreaterThanForest',
  minArity: 2,
  executor: (context) => {
    return (value?: string, maxValue?: string): NodeValueValidation => {
      const valid = Objects.isEmpty(value) || !Numbers.greaterThan(value, maxValue)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'generalValidation.valueCannotExceedMaximumValueReportedForForestAreaYear',
              params: { maxForestArea: Numbers.toFixed(maxValue), year: context.colName },
            },
          ]

      return { valid, messages }
    }
  },
}
