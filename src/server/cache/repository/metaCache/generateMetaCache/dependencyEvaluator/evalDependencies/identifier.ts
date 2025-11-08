import { ExpressionNodeEvaluator, IdentifierExpression } from 'lib/expressionEvaluator/node'

import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'

export class IdentifierEvaluator extends ExpressionNodeEvaluator<Context, IdentifierExpression> {
  // eslint-disable-next-line class-methods-use-this
  evaluate(expressionNode: IdentifierExpression): any {
    const { name } = expressionNode
    return name
  }
}
