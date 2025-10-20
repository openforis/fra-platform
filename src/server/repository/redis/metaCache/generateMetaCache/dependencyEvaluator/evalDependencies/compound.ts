import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ExpressionContext } from 'meta/expressions/context'
import { CompoundExpression } from 'meta/expressions/node'

export class CompoundEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CompoundExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(): any {
    throw new Error(`compound not supported`)
  }
}
