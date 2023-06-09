import { JavascriptExpressionEvaluator } from '@openforis/arena-core'

import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { Context } from './context'
import { evaluators } from './evaluators'
import { functions } from './functions'

type Props = Context & { formula: string }

const evalFormula = <ReturnType>(props: Props): ReturnType => {
  const evaluator = new JavascriptExpressionEvaluator<Context>(functions, evaluators)
  return evaluator.evaluate(props.formula, props)
}

export const ExpressionEvaluator = {
  evalFormula,
  parseMemberVariable,
}
