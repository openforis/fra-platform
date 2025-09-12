import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@openforis/arena-core'

import { ArrayEvaluator } from './array'
import { Binary } from './binary'
import { CallEvaluator } from './call'
import { CompoundEvaluator } from './compound'
import { ConditionalEvaluator } from './conditional'
import { Context } from './context'
import { IdentifierEvaluator } from './identifier'
import { LiteralEvaluator } from './literal'
import { MemberEvaluator } from './member'
import { SequenceEvaluator } from './sequence'
import { ThisEvaluator } from './this'
import { UnaryEvaluator } from './unary'

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
