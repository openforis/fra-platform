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
    // should return, assessmentName = fra, cycleName = 2025
    return {
      // @ts-ignore
      tableName: expressionNode.object.object.property.name,
      // @ts-ignore
      variableName: expressionNode.property.value,
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
  if (
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
}

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, tableName, type } = this.context

    // Example of: <calcualteFn> = [...result]
    // Case 1: extentOfForest.forestArea (2) [extentOfForest, forestArea]
    // Case 2: extentOfForest.forestArea['2025'] (3) [extentOfForest, forestArea]
    // Case 3: fra['2025'].extentOfForest.forestArea (4) [fra, '2025', extentOfForest, forestArea]
    // Case 4: fra['2025'].extentOfForest.forestArea['2025'] (4) [fra, '2025', extentOfForest, forestArea]

    // NOTE: For testing purposes row with id 211, is updated manually
    // "calculateFn": {
    //     "66817a08-dc93-4151-b5ed-176d8f04e9b7": "fra['2020'].extentOfForest.forestArea",
    //     "66da2217-da42-492f-9ff4-c99a59e6675c": "fra['2025'].extentOfForest.forestArea['2025']"
    //   },

    if (!getTableNameAndVariableName(expressionNode) || this.context.row.id === 211) {
      console.log('MemberEvaluator')
      console.log(object, property, expressionNode)
      console.log(this.context.row)
      console.log(JSON.stringify(expressionNode, null, 2))
      return ''
    }

    const {
      tableName: _tableName,
      variableName: _variableName,
      assessmentName,
      cycleName,
    } = getTableNameAndVariableName(expressionNode)

    const objectName = _tableName
    const propertyName = _variableName

    if (assessmentMetaCache.variablesByTable[objectName]) {
      const dependantTable = assessmentMetaCache[type].dependants?.[objectName] ?? {}
      const dependants = dependantTable[propertyName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }
      if (!excludeDependant(row, objectName, propertyName) && !includesVariableCache(dependants, dependant)) {
        assessmentMetaCache[type].dependants = {
          ...assessmentMetaCache[type].dependants,
          // @ts-ignore
          [objectName]: {
            ...dependantTable,
            // @ts-ignore
            [propertyName]: [...dependants, dependant],
          },
        }
      }

      const dependencyTable = assessmentMetaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []
      // @ts-ignore
      const dependency: VariableCache = { variableName: propertyName, tableName: objectName }

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

      const evaluateObject = this.evaluator.evaluateNode(object, this.context)
      console.log('evaluateObject', evaluateObject)
      const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
      console.log('evaluateProperty', evaluateProperty)
      return `${evaluateObject}.${evaluateProperty}`
    }
    return `${objectName}.${propertyName}`
  }
}
