import { ExpressionNodeType } from 'meta/expressions/expressionNode'
import { IdentifierExpression, MemberExpression } from 'meta/expressions/node'

export const customDepenendencies: Record<string, MemberExpression> = {
  maxForestArea: {
    type: 'MemberExpression' as ExpressionNodeType.Member,
    computed: false,
    object: {
      type: 'Identifier' as ExpressionNodeType.Identifier,
      name: 'extentOfForest',
    } as IdentifierExpression,
    property: {
      type: 'Identifier' as ExpressionNodeType.Identifier,
      name: 'forestArea',
    } as IdentifierExpression,
  },
  maxLandArea: {
    type: 'MemberExpression' as ExpressionNodeType.Member,
    computed: false,
    object: {
      type: 'Identifier' as ExpressionNodeType.Identifier,
      name: 'extentOfForest',
    } as IdentifierExpression,
    property: {
      type: 'Identifier' as ExpressionNodeType.Identifier,
      name: 'totalLandArea',
    } as IdentifierExpression,
  },
}
