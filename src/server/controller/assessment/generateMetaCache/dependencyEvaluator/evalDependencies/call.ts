import {
  CallExpression,
  ExpressionContext,
  ExpressionNode,
  ExpressionNodeEvaluator,
  ExpressionNodeType,
  IdentifierExpression,
} from '@openforis/arena-core'

import { customDepenendencies } from './customDepenendencies'

export class CallEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CallExpression> {
  evaluate(expressionNode: CallExpression): any {
    const { callee } = expressionNode

    // custom dependencies
    if (Object.keys(customDepenendencies).includes((callee as unknown as IdentifierExpression)?.name)) {
      const name = (callee as unknown as IdentifierExpression)?.name

      return this.evaluator.evaluateNode(customDepenendencies[name], this.context)
    }

    return `${this.evaluator.evaluateNode(
      callee as unknown as ExpressionNode<ExpressionNodeType>,
      this.context
    )}(${expressionNode.arguments.map((arg) => this.evaluator.evaluateNode(arg, this.context)).join(',')})`
  }
}
