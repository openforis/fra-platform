import { ExpressionContext, ExpressionNodeEvaluator, UnaryExpression } from '@openforis/arena-core'

export class UnaryEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, UnaryExpression> {
  evaluate(expressionNode: UnaryExpression): any {
    const { argument, operator } = expressionNode
    const evaluateArg = this.evaluator.evaluateNode(argument, this.context)
    return `${operator} ${evaluateArg}`
  }
}
