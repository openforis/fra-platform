import { ExpressionNodeType, JavascriptExpressionEvaluator } from '@openforis/arena-core'

import { NodeValueValidation } from '@meta/assessment'

import { Binary } from './binary'
import { ConditionalEvaluator } from './conditional'
import { Context } from './context'
import { MemberEvaluator } from './member'
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
  const evaluator = new JavascriptExpressionEvaluator<Context>(
    [
      {
        name: 'isValidOdp',
        minArity: 1,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        executor: () => {
          // console.log(conxtext)

          return (forestArea?: string): NodeValueValidation => {
            // console.log(forestArea)
            return { valid: !!forestArea }
          }
        },
      },
    ],
    evaluators
  )

  return evaluator.evaluate(formula, context)
}

export const ExpressionEvaluator = {
  evalFormula,
}
