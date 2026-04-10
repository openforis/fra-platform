import { NodeValueValidation, NodeValueValidationMessage } from 'meta/assessment/nodeValueValidation'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from '../context'

export const validatorNextCountryReportYear: ExpressionFunction<Context> = {
  name: 'validatorNextCountryReportYear',
  minArity: 1,
  executor: () => {
    return (value?: string): NodeValueValidation => {
      const currentYear = new Date().getFullYear()

      const valid = Objects.isEmpty(value) || Numbers.greaterThanOrEqualTo(value, currentYear)

      const messages: Array<NodeValueValidationMessage> = valid
        ? undefined
        : [
            {
              validatorName: validatorNextCountryReportYear.name,
              key: 'generalValidation.countryReportYearGreaterThanCurrentYear',
              params: { minValue: currentYear },
            },
          ]

      return { valid, messages }
    }
  },
}
