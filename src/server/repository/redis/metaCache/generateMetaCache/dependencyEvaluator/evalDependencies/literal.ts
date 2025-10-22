import { ExpressionContext } from 'lib/expressionEvaluator/context'
import { ExpressionNodeEvaluator, LiteralExpression } from 'lib/expressionEvaluator/node'

export class LiteralEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, LiteralExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: LiteralExpression): any {
    // @ts-ignore (raw must be added as key to LiteralExpression in @arena-core
    return expressionNode.raw
  }
}
