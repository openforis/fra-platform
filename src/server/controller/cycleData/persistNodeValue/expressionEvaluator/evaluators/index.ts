import { ArrayEvaluator } from './array'
import { Binary } from './binary'
import { ConditionalEvaluator } from './conditional'
import { MemberEvaluator } from './member'
import { SequenceEvaluator } from './sequence'

export const evaluators = {
  BinaryExpression: Binary,
  ConditionalExpression: ConditionalEvaluator,
  MemberExpression: MemberEvaluator,
  SequenceExpression: SequenceEvaluator,
  ArrayExpression: ArrayEvaluator,
}
