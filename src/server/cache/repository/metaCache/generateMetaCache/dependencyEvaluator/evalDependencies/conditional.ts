import { ConditionalExpression, ExpressionNodeEvaluator } from 'lib/expressionEvaluator/node'

import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'

export class ConditionalEvaluator extends ExpressionNodeEvaluator<Context, ConditionalExpression> {
  evaluate(expressionNode: ConditionalExpression): any {
    const { alternate, consequent, test } = expressionNode

    const evaluateTest = this.evaluator.evaluateNode(test, this.context)
    const evaluateConsequent = this.evaluator.evaluateNode(consequent, this.context)
    const evaluateAlternate = this.evaluator.evaluateNode(alternate, this.context)

    return `${evaluateTest} ? ${evaluateConsequent} : ${evaluateAlternate}`
  }
}
