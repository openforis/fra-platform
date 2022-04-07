import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@openforis/arena-core'
import { Context } from './context'
import { MemberEvaluator } from './member'
import { Binary } from './binary'
import { ConditionalEvaluator } from './conditional'
import { SequenceEvaluator } from './sequence'

const evalFormula = (props: Context & { formula: string }): any => {
  const { formula, ...context } = props
  const evaluators = {
    // @ts-ignore
    [ExpressionNodeType.Member]: MemberEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Binary]: Binary,
    // @ts-ignore
    [ExpressionNodeType.Conditional]: ConditionalEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Sequence]: SequenceEvaluator,
  }
  const evaluator = new JavascriptExpressionEvaluator<Context>([], evaluators)
  return evaluator.evaluate(formula, context)
}

export const ExpressionEvaluator = {
  evalFormula,
}
