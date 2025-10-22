import { ExpressionContext } from '../../context'
import { ExpressionNodeEvaluator, LiteralExpression } from '../../node'

export class LiteralEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, LiteralExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: LiteralExpression): any {
    return expressionNode.value
  }
}
