import { ExpressionContext, ExpressionNodeEvaluator, GroupExpression } from '@arena/core'

export class GroupEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, GroupExpression> {
  evaluate(expressionNode: GroupExpression): any {
    const { argument } = expressionNode
    return this.evaluator.evaluateNode(argument, this.context)
  }
}
