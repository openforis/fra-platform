import { ExpressionContext } from '../../context'
import { ExpressionNodeEvaluator, UnaryExpression } from '../../node'

const unaryOperators: { [key: string]: (x: any) => any } = {
  // Only accept bools and nulls as input.
  // Otherwise return null
  '!': (x: any): boolean | null => (x === null || x === undefined || x.constructor === Boolean ? !x : null),

  // Negation: Only accept normal finite numbers, otherwise return null
  // NOTE: Under JS semantics, we would have -"123" -> -123
  '-': (x: any): number | null => (Number.isFinite(x) ? -x : null),

  // Don't allow the unary + operator now. Define semantics for it first.
  // Under JS semantics, "+" coerces a string to a number.
  // Maybe we should just have `parseNumber` in `stdlib`?
  // '+': x => R.isNil(x) ? null : +x,
}

export class UnaryEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, UnaryExpression> {
  evaluate(expressionNode: UnaryExpression): any {
    const { argument, operator } = expressionNode
    const fn = unaryOperators[operator]

    if (!fn) {
      throw new Error(`Unary operator ${operator} not supported`)
    }

    const res = this.evaluator.evaluateNode(argument, this.context)
    return fn(res)
  }
}
