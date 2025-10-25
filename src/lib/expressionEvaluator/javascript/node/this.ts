import { ExpressionContext } from '../../context'
import { ExpressionNodeEvaluator, ThisExpression } from '../../node'

export class ThisEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ThisExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    throw new Error(`this not supported`)
  }
}
