import { ExpressionNode, ExpressionNodeType } from './node'

export interface ExpressionParser {
  parse(expression: string): ExpressionNode<ExpressionNodeType>
}
