import { ExpressionFunction } from 'lib/expressionEvaluator/function'

import { Context } from 'meta/expressionEvaluator/context'

export const getYear: ExpressionFunction<Context> = {
  name: 'getYear',
  minArity: 1,
  executor: () => {
    return (dateISO: string): string => {
      if (!dateISO) return null

      return new Date(dateISO).getFullYear().toString()
    }
  },
}
