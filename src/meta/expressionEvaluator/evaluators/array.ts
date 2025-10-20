import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ArrayExpression } from 'meta/expressions/node'

import { Context } from '../context'

export class ArrayEvaluator extends ExpressionNodeEvaluator<Context, ArrayExpression> {
  evaluate(expressionNode: ArrayExpression): any {
    const { elements } = expressionNode

    const result = elements.map((element) => this.evaluator.evaluateNode(element, this.context))

    return result
  }
}
