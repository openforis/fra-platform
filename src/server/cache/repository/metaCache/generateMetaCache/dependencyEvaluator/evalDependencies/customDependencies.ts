import { AllColumnsDependencyKey } from 'meta/assessment/metaCache'
import { TableNames } from 'meta/assessment/table'

import {
  ExpressionNodeType,
  IdentifierExpression,
  LiteralExpression,
  MemberExpression,
} from 'lib/expressionEvaluator/node'

export const customDependencies: Record<string, MemberExpression> = {
  maxForestArea: {
    type: 'MemberExpression' as ExpressionNodeType.Member,
    computed: true,
    object: {
      type: 'MemberExpression' as ExpressionNodeType.Member,
      computed: false,
      object: {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: TableNames.extentOfForest,
      } as IdentifierExpression,
      property: {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'forestArea',
      } as IdentifierExpression,
    } as MemberExpression,
    property: {
      type: 'Literal' as ExpressionNodeType.Literal,
      raw: `'${AllColumnsDependencyKey}'`,
      value: AllColumnsDependencyKey,
    } as LiteralExpression,
  },
  maxLandArea: {
    type: 'MemberExpression' as ExpressionNodeType.Member,
    computed: true,
    object: {
      type: 'MemberExpression' as ExpressionNodeType.Member,
      computed: false,
      object: {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: TableNames.extentOfForest,
      } as IdentifierExpression,
      property: {
        type: 'Identifier' as ExpressionNodeType.Identifier,
        name: 'totalLandArea',
      } as IdentifierExpression,
    } as MemberExpression,
    property: {
      type: 'Literal' as ExpressionNodeType.Literal,
      raw: `'${AllColumnsDependencyKey}'`,
      value: AllColumnsDependencyKey,
    } as LiteralExpression,
  },
}
