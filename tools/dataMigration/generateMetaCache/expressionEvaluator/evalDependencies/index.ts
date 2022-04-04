import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@arena/core'
import { Binary } from './binary'
import { CallEvaluator } from './call'
import { CompoundEvaluator } from './compound'
import { IdentifierEvaluator } from './identifier'
import { LiteralEvaluator } from './literal'
import { MemberEvaluator } from './member'
import { ThisEvaluator } from './this'
import { UnaryEvaluator } from './unary'
import { Context } from './context'

export const evalDependencies = (expression: string, context: Context): void => {
  const evaluators = {
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
  }
  const evaluator = new JavascriptExpressionEvaluator<Context>([], evaluators)
  evaluator.evaluate(expression, context)
}
