import { ExpressionContext } from './context'

export interface ExpressionFunction<C extends ExpressionContext> {
  name: string
  minArity: number
  maxArity?: number
  executor: (conxtext: C) => (...args: Array<any>) => any
  /**
   * True if the arguments of the function must be evaluated as nodes.
   * @default false
   */
  evaluateArgsToNodes?: boolean
  /**
   * True if the result of the evaluation of the function must be a node,
   * otherwise it will be the node value.
   * @default false
   */
  evaluateToNode?: boolean
}
