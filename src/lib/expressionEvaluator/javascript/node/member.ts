import { ExpressionContext } from '../../context'
import { ExpressionNodeEvaluator, MemberExpression } from '../../node'

export class MemberEvaluator<CONTEXT extends ExpressionContext, RETURNED = unknown> extends ExpressionNodeEvaluator<
  CONTEXT,
  MemberExpression
> {
  evaluate(expressionNode: MemberExpression): RETURNED {
    const { computed, object, property } = expressionNode

    const objectEval = this.evaluator.evaluateNode(object, { ...this.context, evaluateToNode: true })
    if (!objectEval) return null

    const propertyEval = this.evaluator.evaluateNode(property, {
      ...this.context,
      object: computed ? this.context.object : objectEval,
    })

    return computed ? objectEval[propertyEval] : propertyEval
  }
}
