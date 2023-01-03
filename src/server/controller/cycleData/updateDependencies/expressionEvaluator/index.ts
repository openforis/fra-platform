import { JavascriptExpressionEvaluator } from '@openforis/arena-core'

import { Context } from './context'
import { evaluators } from './evaluators'
import { functions } from './functions'

type Props = Context & { formula: string }

const evalFormula = <ReturnType>(props: Props): ReturnType => {
  const { formula, ...context } = props

  const evaluator = new JavascriptExpressionEvaluator<Context>(functions, evaluators)
  return evaluator.evaluate(formula, context)
}

export const ExpressionEvaluator = {
  evalFormula,
}
