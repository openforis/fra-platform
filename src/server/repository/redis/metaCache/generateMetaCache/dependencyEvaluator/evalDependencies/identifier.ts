import { ExpressionNodeEvaluator, IdentifierExpression } from '@openforis/arena-core'

import { Context } from './context'

export class IdentifierEvaluator extends ExpressionNodeEvaluator<Context, IdentifierExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: IdentifierExpression): any {
    const { name } = expressionNode
    return name
  }
}
