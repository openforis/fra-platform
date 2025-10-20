import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ExpressionContext } from 'meta/expressions/context'
import { ThisExpression } from 'meta/expressions/node'

export class ThisEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ThisExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    return 'this'
  }
}
