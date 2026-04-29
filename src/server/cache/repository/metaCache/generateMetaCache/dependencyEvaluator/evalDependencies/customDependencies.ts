import { ExpressionNodeType, IdentifierExpression, MemberExpression } from 'lib/expressionEvaluator/node'

export const customDependencies: Record<string, MemberExpression> = {
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
