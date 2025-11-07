import { ExpressionContext } from 'lib/expressionEvaluator/context'
import { BinaryExpression, ExpressionNodeEvaluator } from 'lib/expressionEvaluator/node'

export class Binary<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, operator, right } = expressionNode
    const evaluateLeft = this.evaluator.evaluateNode(left, this.context)
    const evaluateRight = this.evaluator.evaluateNode(right, this.context)
    return `${evaluateLeft} ${operator} ${evaluateRight}`
  }
}
