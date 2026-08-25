import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { ValidatorName } from 'meta/expressionEvaluator/validatorName'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorRemainingLandWithTreeCoverTotal: ExpressionFunction<Context> = {
  name: ValidatorName.remainingLandWithTreeCoverTotal,
  minArity: 2,
  executor: () => {
    return (categoryValues?: Array<string>, remainingLand?: string): NodeValueValidation => {
      const reportedValues = categoryValues?.filter((value) => !Objects.isEmpty(value)) ?? []

      // a year with nothing reported in 1e is valid regardless of what 1a contains
      const valid =
        reportedValues.length === 0 ||
        Objects.isEmpty(remainingLand) ||
        Numbers.greaterThanWithTolerance(remainingLand, Numbers.sum(reportedValues))

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              name: ValidatorName.remainingLandWithTreeCoverTotal,
              key: 'generalValidation.remainingLandExceedsExtentOfForest',
            },
          ]

      return { valid, messages }
    }
  },
}
