import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { SequenceExpression } from 'meta/expressions/node'

import { Context } from './context'

export class SequenceEvaluator extends ExpressionNodeEvaluator<Context, SequenceExpression> {
  evaluate(expressionNode: SequenceExpression): any {
    const { expression } = expressionNode

    const result = this.evaluator.evaluateNode(expression, this.context)

    return result
  }
}
