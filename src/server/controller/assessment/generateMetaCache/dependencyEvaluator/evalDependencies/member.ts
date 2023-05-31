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

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, tableName, type } = this.context

    // Todo: Identify the following cases:
    // Case 1: extentOfForest.forestArea (2) [extentOfForest, forestArea]
    // Case 2: extentOfForest.forestArea['2025'] (3) [extentOfForest, forestArea]
    // Case 3: fra['2025'].extentOfForest.forestArea (4) [fra, '2025', extentOfForest, forestArea]

    // @ts-ignore
    const objectName = object?.object?.name ?? object.name
    // @ts-ignore
    const propertyName = object?.property?.name ?? property.name

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
      const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
      return `${evaluateObject}.${evaluateProperty}`
    }
    return `${objectName}.${propertyName}`
  }
}
