import { ExpressionContext } from '../../context'
import { ArrayExpression, ExpressionNodeEvaluator } from '../../node'

export class ArrayEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ArrayExpression> {
  evaluate(expressionNode: ArrayExpression): Array<unknown> {
    const { elements } = expressionNode
    return elements.map((element) => this.evaluator.evaluateNode(element, this.context))
  }
}
