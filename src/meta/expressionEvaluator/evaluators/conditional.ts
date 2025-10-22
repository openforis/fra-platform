import { ConditionalExpression, ExpressionNodeEvaluator } from 'lib/expressionEvaluator/node'

import { Context } from '../context'

export class ConditionalEvaluator extends ExpressionNodeEvaluator<Context, ConditionalExpression> {
  evaluate(expressionNode: ConditionalExpression): any {
    const { alternate, consequent, test } = expressionNode

    const evaluateTest = Boolean(this.evaluator.evaluateNode(test, this.context))
    const nodeToEvaluate = evaluateTest ? consequent : alternate
    const result = this.evaluator.evaluateNode(nodeToEvaluate, this.context)

    return result
  }
}
