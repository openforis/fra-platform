import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@arena/core'
import { AssessmentMetaCache, Row } from '../../../../../meta/assessment'
import { Binary } from './binary'
import { CallEvaluator } from './call'
import { CompoundEvaluator } from './compound'
import { GroupEvaluator } from './group'
import { IdentifierEvaluator } from './identifier'
import { LiteralEvaluator } from './literal'
import { MemberEvaluator } from './member'
import { ThisEvaluator } from './this'
import { UnaryEvaluator } from './unary'
import { Context, VariablesCache } from './context'

export const evalDependencies = (
  row: Row,
  assessmentMetaCache: AssessmentMetaCache,
  variablesCache: VariablesCache
): string => {
  const evaluators = {
    // @ts-ignore
    [ExpressionNodeType.Binary]: Binary,
    // @ts-ignore
    [ExpressionNodeType.Call]: CallEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Compound]: CompoundEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Group]: GroupEvaluator,
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
  return evaluator.evaluate(row.props.calculateFn, { assessmentMetaCache, row, variablesCache })
}
