import { ExpressionContext, ExpressionNodeEvaluator, IdentifierExpression } from '@arena/core'

export class IdentifierEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, IdentifierExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: IdentifierExpression): any {
    const { name } = expressionNode
    return name
  }
}
