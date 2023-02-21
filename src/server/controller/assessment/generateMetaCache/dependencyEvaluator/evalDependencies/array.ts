import { ArrayExpression, ExpressionContext, ExpressionNodeEvaluator } from '@openforis/arena-core'

export class ArrayEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ArrayExpression> {
  evaluate(expressionNode: ArrayExpression): any {
    const { elements } = expressionNode

    return `[${elements.map((element) => this.evaluator.evaluateNode(element, this.context)).join(',')}]`
  }
}
