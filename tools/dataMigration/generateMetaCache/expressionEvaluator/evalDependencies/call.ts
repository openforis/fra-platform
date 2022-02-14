import {
  CallExpression,
  ExpressionContext,
  ExpressionNode,
  ExpressionNodeEvaluator,
  ExpressionNodeType,
} from '@arena/core'

export class CallEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CallExpression> {
  evaluate(expressionNode: CallExpression): any {
    const { callee } = expressionNode

    return `${this.evaluator.evaluateNode(
      callee as unknown as ExpressionNode<ExpressionNodeType>,
      this.context
    )}(${expressionNode.arguments.map((arg) => this.evaluator.evaluateNode(arg, this.context)).join(',')})`
  }
}
