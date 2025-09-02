import { ExpressionContext, ExpressionNodeEvaluator, ThisExpression } from '@openforis/arena-core'

export class ThisEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ThisExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    return 'this'
  }
}
