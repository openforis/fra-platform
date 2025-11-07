import { ExpressionContext } from '../../context'
import { BinaryExpression, ExpressionNodeEvaluator } from '../../node'

const booleanOperators: { [operator: string]: (a: any, b: any) => boolean } = {
  // Short-circuiting operators (we coerce the output to bool)
  '||': (a, b) => Boolean(a || b),
  '&&': (a, b) => Boolean(a && b),
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

const arithmeticOperators: { [operator: string]: (a: number, b: number) => number } = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
  '**': (a, b) => a ** b,
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

export class BinaryEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, operator, right } = expressionNode

    const fn = binaryOperators[operator]
    if (!fn) {
      throw new Error(`Boolean ${operator} not supported`)
    }

    const leftResult = this.evaluator.evaluateNode(left, this.context)
    const rightResult = this.evaluator.evaluateNode(right, this.context)

    const nullCount = [leftResult, rightResult].filter((result) => result === null || result === undefined).length

    // Arithmetic operators will always return nulls for any non-numeric inputs
    if (operator in arithmeticOperators) {
      if (
        leftResult !== null &&
        leftResult !== undefined &&
        leftResult.constructor === Number &&
        rightResult !== null &&
        rightResult !== undefined &&
        rightResult.constructor === Number
      ) {
        return fn(leftResult as number, rightResult as number)
      }
      return null
    }

    // Boolean operators:
    // Like ternary logic, but logical OR has special handling.
    // The expression is boolean if either value is not null.
    // Otherwise the result is null.
    // All other operators return null if either operand is null
    const isValid = (operator === '||' && nullCount < 2) || nullCount === 0

    return isValid ? fn(leftResult, rightResult) : null
  }
}
