import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { IdentifierExpression } from 'meta/expressions/node'

import { Context } from './context'

export class IdentifierEvaluator extends ExpressionNodeEvaluator<Context, IdentifierExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: IdentifierExpression): any {
    const { name } = expressionNode
    return name
  }
}
