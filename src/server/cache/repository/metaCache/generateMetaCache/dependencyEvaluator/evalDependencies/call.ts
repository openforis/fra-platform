import { ExpressionContext } from 'lib/expressionEvaluator/context'
import type { CallExpression, ExpressionNode, IdentifierExpression } from 'lib/expressionEvaluator/node'
import { ExpressionNodeEvaluator, ExpressionNodeType } from 'lib/expressionEvaluator/node'

import { customDependencies } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/customDependencies'

export class CallEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CallExpression> {
  evaluate(expressionNode: CallExpression): any {
    const { callee } = expressionNode
    const identifier = callee as unknown as IdentifierExpression

    // custom dependencies
    if (Object.keys(customDependencies).includes(identifier?.name)) {
      const name = (callee as unknown as IdentifierExpression)?.name

      return this.evaluator.evaluateNode(customDependencies[name], this.context)
    }

    return `${this.evaluator.evaluateNode(
      callee as unknown as ExpressionNode<ExpressionNodeType>,
      this.context
    )}(${expressionNode.arguments.map((arg) => this.evaluator.evaluateNode(arg, this.context)).join(',')})`
  }
}
