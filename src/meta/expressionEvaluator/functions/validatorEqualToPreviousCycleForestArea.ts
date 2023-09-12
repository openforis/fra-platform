import { ExpressionFunction } from '@openforis/arena-core/dist/expression/function'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment'

import { Context } from '../context'

// This validator is only used for assessment fra, cycle 2025, table 1a extentOfForest, variable forest area
export const validatorEqualToPreviousCycleForestArea: ExpressionFunction<Context> = {
  name: 'validatorEqualToPreviousCycleForestArea',
  minArity: 2,
  executor: () => {
    return (forestArea2020?: string, forestArea2025?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestArea2020) ||
        Objects.isEmpty(forestArea2025) ||
        Numbers.eqWithTolerance(forestArea2025, forestArea2020)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              key: 'generalValidation.forestAreaReportedIsDifferentFromPreviousCycle',
              params: {
                forestArea2020: Numbers.format(Number(forestArea2020)),
                forestArea2025: Numbers.format(Number(forestArea2025)),
              },
            },
          ]

      return { valid, messages }
    }
  },
}
