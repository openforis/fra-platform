import { ExpressionNode, ExpressionNodeType } from '../../node'
import { ExpressionParser } from '../../parser'
import { jsep } from './jsep'

export class JavascriptExpressionParser implements ExpressionParser {
  // eslint-disable-next-line class-methods-use-this
  parse(expression: string): ExpressionNode<ExpressionNodeType> {
    return jsep(expression) as ExpressionNode<ExpressionNodeType>
  }
}
