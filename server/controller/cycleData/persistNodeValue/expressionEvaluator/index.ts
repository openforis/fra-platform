import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@arena/core'
import { Context } from './context'
import { MemberEvaluator } from './member'
import { Binary } from './binary'

const evalFormula = (props: Context & { formula: string }): any => {
  const { formula, ...context } = props
  const evaluators = {
    // @ts-ignore
    [ExpressionNodeType.Member]: MemberEvaluator,
    // @ts-ignore
    [ExpressionNodeType.Binary]: Binary,
  }
  const evaluator = new JavascriptExpressionEvaluator<Context>([], evaluators)
  return evaluator.evaluate(formula, context)
}

export const ExpressionEvaluator = {
  evalFormula,
}
