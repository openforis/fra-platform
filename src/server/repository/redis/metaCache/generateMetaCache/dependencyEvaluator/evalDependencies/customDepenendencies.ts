import { ExpressionNodeType, IdentifierExpression, MemberExpression } from '@openforis/arena-core'

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
