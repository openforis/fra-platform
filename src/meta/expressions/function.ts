import { ExpressionContext } from './context'

export interface ExpressionFunction<C extends ExpressionContext> {
  name: string
  minArity: number
  maxArity?: number
  executor: (conxtext: C) => (...args: Array<unknown>) => any
  evaluateArgsToNodes?: boolean
  evaluateToNode?: boolean
}
