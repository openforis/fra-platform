import { ExpressionContext } from './context'
import { ExpressionEvaluator } from './evaluator'

export enum ExpressionNodeType {
  Array = 'ArrayExpression',
  Binary = 'BinaryExpression',
  Call = 'CallExpression',
  Compound = 'Compound',
  Conditional = 'ConditionalExpression',
  Identifier = 'Identifier',
  Literal = 'Literal',
  Member = 'MemberExpression',
  Sequence = 'SequenceExpression',
  This = 'ThisExpression',
  Unary = 'UnaryExpression',
}

export interface ExpressionNode<T extends ExpressionNodeType> {
  type: T
}

export interface ArrayExpression extends ExpressionNode<ExpressionNodeType.Array> {
  elements: Array<ExpressionNode<ExpressionNodeType>>
}
export interface BinaryExpression extends ExpressionNode<ExpressionNodeType.Binary> {
  left: ExpressionNode<ExpressionNodeType>
  right: ExpressionNode<ExpressionNodeType>
  operator: string
}
export interface CallExpression extends ExpressionNode<ExpressionNodeType.Call> {
  arguments: Array<ExpressionNode<ExpressionNodeType>>
  callee: ExpressionNode<ExpressionNodeType>
}
export type CompoundExpression = ExpressionNode<ExpressionNodeType.Compound>
export interface ConditionalExpression extends ExpressionNode<ExpressionNodeType.Conditional> {
  test: ExpressionNode<ExpressionNodeType>
  consequent: ExpressionNode<ExpressionNodeType>
  alternate: ExpressionNode<ExpressionNodeType>
}
export interface IdentifierExpression extends ExpressionNode<ExpressionNodeType.Identifier> {
  name: string
}
export interface LiteralExpression extends ExpressionNode<ExpressionNodeType.Literal> {
  raw: string
  value: any
}
export interface MemberExpression extends ExpressionNode<ExpressionNodeType.Member> {
  computed: boolean
  object: ExpressionNode<ExpressionNodeType>
  property: ExpressionNode<ExpressionNodeType>
  optional?: boolean
}
export interface SequenceExpression extends ExpressionNode<ExpressionNodeType.Sequence> {
  expression: ExpressionNode<ExpressionNodeType>
}
export type ThisExpression = ExpressionNode<ExpressionNodeType.This>
export interface UnaryExpression extends ExpressionNode<ExpressionNodeType.Unary> {
  argument: ExpressionNode<ExpressionNodeType>
  operator: string
  prefix: boolean
}

export interface ExpressionNodeEvaluatorConstructor<
  C extends ExpressionContext,
  N extends ExpressionNode<ExpressionNodeType>
> {
  new (evaluator: ExpressionEvaluator<C>, context: C): ExpressionNodeEvaluator<C, N>
}

export abstract class ExpressionNodeEvaluator<
  C extends ExpressionContext,
  N extends ExpressionNode<ExpressionNodeType>
> {
  readonly evaluator: ExpressionEvaluator<C>
  readonly context: C

  constructor(evaluator: ExpressionEvaluator<C>, context: C) {
    this.evaluator = evaluator
    this.context = context
  }

  abstract evaluate(expressionNode: N): any
}
