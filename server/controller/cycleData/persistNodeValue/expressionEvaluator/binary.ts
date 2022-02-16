import BigNumber from 'bignumber.js'
import { BinaryExpression, ExpressionNodeEvaluator } from '@arena/core'
import { Numbers } from '@core/utils'
import { Context } from './context'

const operators: { [operator: string]: (a: number, b: number) => BigNumber | null } = {
  '+': (a, b) => Numbers.add(a, b),
  '-': (a, b) => Numbers.sub(a, b),
  '*': (a, b) => Numbers.mul(a, b),
  '/': (a, b) => Numbers.div(a, b),
  '%': (a, b) => Numbers.modulo(a, b),
  '**': (a, b) => Numbers.pow(a, b),
  // Don't allow bitwise operators:
  // '|':   (a, b) => a | b,
  // '^':   (a, b) => a ^ b,
  // '&':   (a, b) => a & b,
  // Don't allow shifts either:
  // '<<':  (a, b) => a << b,
  // '>>':  (a, b) => a >> b,
  // '>>>': (a, b) => a >>> b,
}

export class Binary extends ExpressionNodeEvaluator<Context, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, right, operator } = expressionNode

    const fn = operators[operator]
    if (!fn) {
      throw new Error(`Boolean ${operator} not supported`)
    }

    const leftResult = this.evaluator.evaluateNode(left, this.context)
    const rightResult = this.evaluator.evaluateNode(right, this.context)
    const result = fn(leftResult, rightResult)
    if (result) return result.toString()
    // Arithmetic operators will always return nulls for any non-numeric inputs.
    // see Numbers.applyOperator
    return result ?? null
  }
}
