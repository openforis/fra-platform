import { ExpressionNodeEvaluator } from '@openforis/arena-core'

import { ExpressionContext } from 'meta/expressions/context'
import { ArrayExpression } from 'meta/expressions/node'

export class ArrayEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ArrayExpression> {
  evaluate(expressionNode: ArrayExpression): any {
    const { elements } = expressionNode

    return `[${elements.map((element) => this.evaluator.evaluateNode(element, this.context)).join(',')}]`
  }
}
