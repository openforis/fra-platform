import { ExpressionContext } from '../../context'
import { CompoundExpression, ExpressionNodeEvaluator } from '../../node'

export class CompoundEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CompoundExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    throw new Error(`compound not supported`)
  }
}
