import { ArrayExpression, ExpressionNodeEvaluator } from 'lib/expressionEvaluator/node'

import { Context } from '../context'

export class ArrayEvaluator extends ExpressionNodeEvaluator<Context, ArrayExpression> {
  evaluate(expressionNode: ArrayExpression): any {
    const { elements } = expressionNode

    const result = elements.map((element) => this.evaluator.evaluateNode(element, this.context))

    return result
  }
}
