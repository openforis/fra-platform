import { MemberExpression } from '@openforis/arena-core'

const getExpressionDepth = (expressionNode: MemberExpression): number => {
  let depth = 0
  let currentExpressionNode = expressionNode
  while (currentExpressionNode.type === 'MemberExpression') {
    depth += 1
    // @ts-ignore
    currentExpressionNode = currentExpressionNode.object
  }
  return depth
}

export const parseMemberVariable = (
  expressionNode: MemberExpression
): {
  tableName: string
  variableName: string
  colName?: string
  assessmentName?: string
  cycleName?: string
  depth?: number
} => {
  const depth = getExpressionDepth(expressionNode)

  switch (depth) {
    // Case when parsing a member expression: extentOfForest.forestArea
    case 1:
      return {
        // @ts-ignore
        tableName: expressionNode.object.name,
        // @ts-ignore
        variableName: expressionNode.property.name,
        colName: undefined,
        assessmentName: undefined,
        cycleName: undefined,
      }

    // Case when parsing a member expression: extentOfForest.forestArea['2025']
    // Case when parsing growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter
    case 2: {
      return {
        // @ts-ignore
        tableName: expressionNode.object.object.name,
        // @ts-ignore
        variableName: expressionNode.object.property.name,
        // @ts-ignore
        colName: expressionNode.property.value ?? expressionNode.property.name,
        assessmentName: undefined,
        cycleName: undefined,
      }
    }

    // Case when parsing a member expression: fra['2025'].extentOfForest.forestArea
    case 3: {
      return {
        // @ts-ignore
        tableName: expressionNode.object.property.name,
        // @ts-ignore
        variableName: expressionNode.property.name,
        colName: undefined,
        // @ts-ignore
        assessmentName: expressionNode.object.object.object.name,
        // @ts-ignore
        cycleName: expressionNode.object.object.property.value,
      }
    }

    // Case when parsing a member expression: fra['2025'].extentOfForest.forestArea['2025']
    // @ts-ignore
    case 4: {
      return {
        // @ts-ignore
        tableName: expressionNode.object.object.property.name,
        // @ts-ignore
        variableName: expressionNode.object.property.name,
        // @ts-ignore
        colName: expressionNode.property.value ?? expressionNode.property.name,
        // @ts-ignore
        assessmentName: expressionNode.object.object.object.object.name,
        // @ts-ignore
        cycleName: expressionNode.object.object.object.property.value,
      }
    }

    default: {
      throw new Error(`Could not parse member expression: ${JSON.stringify(expressionNode)}`)
    }
  }
}
