import {
  CallExpression,
  ExpressionContext,
  ExpressionNode,
  ExpressionNodeEvaluator,
  ExpressionNodeType,
  IdentifierExpression,
  MemberExpression,
} from '@openforis/arena-core'

export class CallEvaluator<C extends ExpressionContext> extends ExpressionNodeEvaluator<C, CallExpression> {
  evaluate(expressionNode: CallExpression): any {
    const { callee } = expressionNode

    // max forest area
    if ((expressionNode.callee as unknown as IdentifierExpression)?.name === 'maxForestArea') {
      const identifierExtentOfForest: IdentifierExpression = {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'extentOfForest',
      }
      const identifierForestArea: IdentifierExpression = {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'forestArea',
      }
      const expressionNode: MemberExpression = {
        type: 'MemberExpression' as ExpressionNodeType.Member,
        computed: false,
        object: identifierExtentOfForest,
        property: identifierForestArea,
      }
      return this.evaluator.evaluateNode(expressionNode, this.context)
    }

    // max land area
    if ((expressionNode.callee as unknown as IdentifierExpression)?.name === 'maxLandArea') {
      const identifierExtentOfForest: IdentifierExpression = {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'extentOfForest',
      }
      const identifierForestArea: IdentifierExpression = {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'totalLandArea',
      }
      const expressionNode: MemberExpression = {
        type: 'MemberExpression' as ExpressionNodeType.Member,
        computed: false,
        object: identifierExtentOfForest,
        property: identifierForestArea,
      }
      return this.evaluator.evaluateNode(expressionNode, this.context)
    }

    return `${this.evaluator.evaluateNode(
      callee as unknown as ExpressionNode<ExpressionNodeType>,
      this.context
    )}(${expressionNode.arguments.map((arg) => this.evaluator.evaluateNode(arg, this.context)).join(',')})`
  }
}
