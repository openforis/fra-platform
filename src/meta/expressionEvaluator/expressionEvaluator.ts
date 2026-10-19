import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { JavascriptExpressionEvaluator } from 'lib/expressionEvaluator/javascript/evaluator'

import { Context } from './context'
import { evaluators } from './evaluators'
import { functions } from './functions'

type Props = Context & { formula: string }

const evaluator = new JavascriptExpressionEvaluator<Context>(functions, evaluators)

const evalFormula = <ReturnType>(props: Props): ReturnType => {
  return evaluator.evaluate(props.formula, props)
}

export const ExpressionEvaluator = {
  evalFormula,
  parseMemberVariable,
}
