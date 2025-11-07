import { JavascriptExpressionEvaluator } from 'lib/expressionEvaluator/javascript/evaluator'
import { ExpressionNodeType } from 'lib/expressionEvaluator/node'

import { ArrayEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/array'
import { Binary } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/binary'
import { CallEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/call'
import { CompoundEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/compound'
import { ConditionalEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/conditional'
import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'
import { IdentifierEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/identifier'
import { LiteralEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/literal'
import { MemberEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/member'
import { SequenceEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/sequence'
import { ThisEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/this'
import { UnaryEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/unary'

export const evalDependencies = (expression: string, context: Context): void => {
  const evaluators = {
    // @ts-ignore
    [ExpressionNodeType.Array]: ArrayEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Binary]: Binary,
    // @ts-ignore
    [ExpressionNodeType.Call]: CallEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Compound]: CompoundEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Identifier]: IdentifierEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Literal]: LiteralEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Logical]: Binary,
    // @ts-ignore
    [ExpressionNodeType.Member]: MemberEvaluator,
    // @ts-ignore
    [ExpressionNodeType.This]: ThisEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Unary]: UnaryEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Conditional]: ConditionalEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Sequence]: SequenceEvaluator,
  }
  const evaluator = new JavascriptExpressionEvaluator<Context>([], evaluators)
  evaluator.evaluate(expression, context)
}
