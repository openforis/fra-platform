import { ExpressionContext } from '../../context'
import { ConditionalExpression, ExpressionNodeEvaluator } from '../../node'

export class ConditionalEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<
  C,
  ConditionalExpression
> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    throw new Error('conditional expression not supported')
  }
}
