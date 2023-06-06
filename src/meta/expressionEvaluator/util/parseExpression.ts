// Normal case when parsing a member expression: extentOfForest.forestArea
// {
//   "type": "MemberExpression",
//   "computed": false,
//   "object": {
//     "type": "Identifier",
//     "name": "extentOfForest"
//   },
//   "property": {
//     "type": "Identifier",
//     "name": "forestArea"
//   }
// }

// Case when parsing a member expression: extentOfForest.forestArea['2025']
// {
//   type: 'MemberExpression',
//   computed: true,
//   object: {
//     type: 'MemberExpression',
//     computed: false,
//     object: {
//       type: 'Identifier',
//       name: 'extentOfForest',
//     },
//     property: {
//       type: 'Identifier',
//       name: 'forestArea',
//     },
//   },
//   property: {
//     type: 'Literal',
//     value: '2025',
//     raw: "'2025'",
//   },
// }

// Case when parsing a member expression: fra['2025'].extentOfForest.forestArea
// {
//   type: 'MemberExpression',
//   computed: false,
//   object: {
//     type: 'MemberExpression',
//     computed: false,
//     object: {
//       type: 'MemberExpression',
//       computed: true,
//       object: {
//         type: 'Identifier',
//         name: 'fra',
//       },
//       property: {
//         type: 'Literal',
//         value: '2025',
//         raw: "'2025'",
//       },
//     },
//     property: {
//       type: 'Identifier',
//       name: 'extentOfForest',
//     },
//   },
//   property: {
//     type: 'Identifier',
//     name: 'forestArea',
//   },
// }

// Case when parsing a member expression: fra['2025'].extentOfForest.forestArea['2025']
//  {
//   type: 'MemberExpression',
//   computed: true,
//   object: {
//     type: 'MemberExpression',
//     computed: false,
//     object: {
//       type: 'MemberExpression',
//       computed: false,
//       object: {
//         type: 'MemberExpression',
//         computed: true,
//         object: {
//           type: 'Identifier',
//           name: 'fra',
//         },
//         property: {
//           type: 'Literal',
//           value: '2025',
//           raw: "'2025'",
//         },
//       },
//       property: {
//         type: 'Identifier',
//         name: 'extentOfForest',
//       },
//     },
//     property: {
//       type: 'Identifier',
//       name: 'forestArea',
//     },
//   },
//   property: {
//     type: 'Literal',
//     value: '2025',
//     raw: "'2025'",
//   },
// }

import { MemberExpression } from '@openforis/arena-core'

export const parseExpression = (
  expressionNode: MemberExpression
): { tableName: string; variableName: string; colName?: string; assessmentName?: string; cycleName?: string } => {
  // Case when parsing a member expression: fra['2025'].extentOfForest.forestArea['2025']
  if (
    expressionNode.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.object.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.object.object.object.type === 'Identifier'
  ) {
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

  // Case when parsing a member expression: fra['2025'].extentOfForest.forestArea
  if (
    expressionNode.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.object.object.type === 'Identifier'
  ) {
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

  // Case when parsing a member expression: extentOfForest.forestArea['2025']
  // Case when parsing growingStockComposition2025.remainingIntroduced.growingStockMillionCubicMeter
  if (
    (expressionNode.property.type === 'Literal' || expressionNode.property.type === 'Identifier') &&
    expressionNode.type === 'MemberExpression' &&
    expressionNode.object.type === 'MemberExpression' &&
    // @ts-ignore
    expressionNode.object.property.type === 'Identifier'
  ) {
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

  // Case when parsing a member expression: extentOfForest.forestArea
  if (expressionNode.object.type === 'Identifier' && expressionNode.property.type === 'Identifier') {
    return {
      // @ts-ignore
      tableName: expressionNode.object.name,
      // @ts-ignore
      variableName: expressionNode.property.name,
      colName: undefined,
      assessmentName: undefined,
      cycleName: undefined,
    }
  }

  throw new Error(`Could not parse member expression: ${JSON.stringify(expressionNode)}`)
}
