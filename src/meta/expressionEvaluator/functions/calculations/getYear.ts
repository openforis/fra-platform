import { Context } from 'meta/expressionEvaluator/context'
import { ExpressionFunction } from 'meta/expressions/function'

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
