import { BinaryExpression, ExpressionNodeEvaluator } from '@openforis/arena-core'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'
import BigNumber from 'bignumber.js'

import { Context } from '../context'

const booleanOperators: { [operator: string]: (a: any, b: any) => boolean } = {
  // Short-circuiting operators
  '||': (a, b) => a || b,
  '&&': (a, b) => a && b,
  '??': (a, b) => a ?? b,
  // Normal boolean operators:
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  // Only allow one kind of equalities.
  // some hidden dependencies on === and !==...
  // '===':  (a, b) => a === b,
  // '!==':  (a, b) => a !== b,
}

const arithmeticOperators: { [operator: string]: (a: number, b: number) => BigNumber | null } = {
  '+': (a, b) => Numbers.add(a, b),
  '-': (a, b) => Numbers.sub(a, b),
  '*': (a, b) => Numbers.mul(a, b),
  '/': (a, b) => Numbers.div(a, b),
  '%': (a, b) => Numbers.modulo(a, b),
  '**': (a, b) => (Objects.isNil(a) || Objects.isNil(b) ? null : new BigNumber(a ** b)),
  // Don't allow bitwise operators:
  // '|':   (a, b) => a | b,
  // '^':   (a, b) => a ^ b,
  // '&':   (a, b) => a & b,
  // Don't allow shifts either:
  // '<<':  (a, b) => a << b,
  // '>>':  (a, b) => a >> b,
  // '>>>': (a, b) => a >>> b,
}

const binaryOperators = {
  ...booleanOperators,
  ...arithmeticOperators,
}

export class Binary extends ExpressionNodeEvaluator<Context, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, right, operator } = expressionNode

    const fn = binaryOperators[operator]
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
