import { ExpressionNodeEvaluator, MemberExpression } from '@arena/core'
import { Context } from './context'

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode

    const evaluateObject = this.evaluator.evaluateNode(object, this.context)
    const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
    return `${evaluateObject}.${evaluateProperty}`
  }
}
