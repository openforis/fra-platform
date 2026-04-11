import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

// This validator is only used for assessment fra, cycle 2025, table 1a extentOfForest, variable forest area
export const validatorEqualToPreviousCycleForestArea: ExpressionFunction<Context> = {
  name: ValidatorName.equalToPreviousCycleForestArea,
  minArity: 2,
  executor: () => {
    return (forestAreaPrevious?: string, forestAreaCurrent?: string): NodeValueValidation => {
      const valid =
        Objects.isEmpty(forestAreaPrevious) ||
        Objects.isEmpty(forestAreaCurrent) ||
        Numbers.eqWithTolerance(forestAreaCurrent, forestAreaPrevious)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.equalToPreviousCycleForestArea,
              key: 'generalValidation.forestAreaReportedIsDifferentFromPreviousCycle',
              params: {
                forestArea2020: Numbers.format(Number(forestAreaPrevious)),
                forestArea2025: Numbers.format(Number(forestAreaCurrent)),
              },
            },
          ]

      return { valid, messages }
    }
  },
}
