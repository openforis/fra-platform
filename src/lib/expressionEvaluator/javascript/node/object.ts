import { ExpressionContext } from '../../context'
import { ExpressionNodeEvaluator, ObjectExpression } from '../../node'

export class ObjectEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, ObjectExpression> {
  evaluate(expressionNode: ObjectExpression): any {
    const { properties } = expressionNode
    const result: Record<string, any> = {}

    // Modify this to support computed keys, e.g.: [x]: 1
    // Update const key = evaluateNode
    properties.forEach((property) => {
      // @ts-ignore
      const key = property.key.name
      const value = this.evaluator.evaluateNode(property.value, this.context)
      result[key] = value
    })

    return result
  }
}
