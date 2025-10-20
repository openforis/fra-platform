import { ExpressionNodeType } from './expressionNode'

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

export declare type CompoundExpression = ExpressionNode<ExpressionNodeType.Compound>

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

export declare type ThisExpression = ExpressionNode<ExpressionNodeType.This>

export interface UnaryExpression extends ExpressionNode<ExpressionNodeType.Unary> {
  argument: ExpressionNode<ExpressionNodeType>
  operator: string
  prefix: boolean
}
