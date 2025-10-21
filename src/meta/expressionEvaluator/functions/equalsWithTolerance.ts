import { Numbers } from 'utils/numbers'

import { Context } from 'meta/expressionEvaluator/context'
import { ExpressionFunction } from 'meta/expressions/function'

export const equalsWithTolerance: ExpressionFunction<Context> = {
  name: 'equalsWithTolerance',
  minArity: 2,
  executor: () => {
    return (valueA: string | undefined, valueB: string | undefined, tolerance: number | undefined): boolean => {
      return Numbers.eqWithTolerance(valueA, valueB, tolerance)
    }
  },
}
