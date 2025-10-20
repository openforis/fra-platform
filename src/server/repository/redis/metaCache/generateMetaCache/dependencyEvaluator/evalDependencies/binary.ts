import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ExpressionContext } from 'meta/expressions/context'
import { BinaryExpression } from 'meta/expressions/node'

export class Binary<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, operator, right } = expressionNode
    const evaluateLeft = this.evaluator.evaluateNode(left, this.context)
    const evaluateRight = this.evaluator.evaluateNode(right, this.context)
    return `${evaluateLeft} ${operator} ${evaluateRight}`
  }
}
