import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'

import { Row, VariableCache } from '@meta/assessment'

import { Context } from './context'

const includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(variables.find((v) => v.variableName === variable.variableName && v.tableName === variable.tableName))

const excludeDependant = (row: Row, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

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

const getTableNameAndVariableName = (
  expressionNode: MemberExpression
): { tableName: string; variableName: string; assessmentName?: string; cycleName?: string } => {
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
      assessmentName: undefined,
      cycleName: undefined,
    }
  }

  throw new Error(`Could not parse member expression: ${JSON.stringify(expressionNode)}`)
}

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { assessmentMetaCache, row, tableName, type } = this.context

    // Example of: <calcualteFn> = [...result]
    // Case 1: extentOfForest.forestArea (2) [extentOfForest, forestArea]
    // Case 2: extentOfForest.forestArea['2025'] (3) [extentOfForest, forestArea]
    // Case 3: fra['2025'].extentOfForest.forestArea (4) [fra, '2025', extentOfForest, forestArea]
    // Case 4: fra['2025'].extentOfForest.forestArea['2025'] (4) [fra, '2025', extentOfForest, forestArea]

    const {
      tableName: _tableName,
      variableName: _variableName,
      assessmentName,
      cycleName,
    } = getTableNameAndVariableName(expressionNode)

    if (assessmentMetaCache.variablesByTable[_tableName]) {
      const dependantTable = assessmentMetaCache[type].dependants?.[_tableName] ?? {}
      const dependants = dependantTable[_variableName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }
      if (!excludeDependant(row, _tableName, _variableName) && !includesVariableCache(dependants, dependant)) {
        assessmentMetaCache[type].dependants = {
          ...assessmentMetaCache[type].dependants,
          // @ts-ignore
          [_tableName]: {
            ...dependantTable,
            // @ts-ignore
            [_variableName]: [...dependants, dependant],
          },
        }
      }

      const dependencyTable = assessmentMetaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []
      // @ts-ignore
      const dependency: VariableCache = { variableName: _variableName, tableName: _tableName }

      if (assessmentName && cycleName) {
        dependency.assessmentName = assessmentName
        dependency.cycleName = cycleName
      }

      if (!includesVariableCache(dependencies, dependency)) {
        assessmentMetaCache[type].dependencies = {
          ...assessmentMetaCache[type].dependencies,
          [tableName]: {
            ...dependencyTable,
            [row.props.variableName]: [...dependencies, dependency],
          },
        }
      }

      return `${tableName}.${_variableName}`
    }
    return `${_tableName}.${_variableName}`
  }
}
