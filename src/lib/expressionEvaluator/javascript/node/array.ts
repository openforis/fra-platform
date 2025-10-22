import { ExpressionContext } from '../../context'
import { ArrayExpression, ExpressionNodeEvaluator } from '../../node'

export class ArrayEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ArrayExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    throw new Error('array expression not supported')
  }
}
