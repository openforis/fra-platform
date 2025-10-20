import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ExpressionContext } from 'meta/expressions/context'
import { UnaryExpression } from 'meta/expressions/node'

export class UnaryEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, UnaryExpression> {
  evaluate(expressionNode: UnaryExpression): any {
    const { argument, operator } = expressionNode
    const evaluateArg = this.evaluator.evaluateNode(argument, this.context)
    return `${operator} ${evaluateArg}`
  }
}
