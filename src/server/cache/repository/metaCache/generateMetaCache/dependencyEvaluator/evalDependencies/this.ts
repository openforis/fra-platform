import { ExpressionContext } from 'lib/expressionEvaluator/context'
import { ExpressionNodeEvaluator, ThisExpression } from 'lib/expressionEvaluator/node'

export class ThisEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ThisExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    return 'this'
  }
}
