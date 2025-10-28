import { ExpressionNodeEvaluator, SequenceExpression } from 'lib/expressionEvaluator/node'

import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'

export class SequenceEvaluator extends ExpressionNodeEvaluator<Context, SequenceExpression> {
  evaluate(expressionNode: SequenceExpression): any {
    const { expression } = expressionNode

    const result = this.evaluator.evaluateNode(expression, this.context)

    return result
  }
}
