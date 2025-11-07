import { ExpressionContext } from 'lib/expressionEvaluator/context'
import { ExpressionNodeEvaluator, UnaryExpression } from 'lib/expressionEvaluator/node'

export class UnaryEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, UnaryExpression> {
  evaluate(expressionNode: UnaryExpression): any {
    const { argument, operator } = expressionNode
    const evaluateArg = this.evaluator.evaluateNode(argument, this.context)
    return `${operator} ${evaluateArg}`
  }
}
