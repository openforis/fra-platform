import { BinaryExpression, ExpressionContext, ExpressionNodeEvaluator } from '@openforis/arena-core'

export class Binary<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, BinaryExpression> {
  evaluate(expressionNode: BinaryExpression): any {
    const { left, right, operator } = expressionNode
    const evaluateLeft = this.evaluator.evaluateNode(left, this.context)
    const evaluateRight = this.evaluator.evaluateNode(right, this.context)
    return `${evaluateLeft} ${operator} ${evaluateRight}`
  }
}
