import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'

import { Row, VariableCache } from '@meta/assessment'
import { ExpressionEvaluator } from '@meta/expressionEvaluator'

import { Context } from './context'

const includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(variables.find((v) => v.variableName === variable.variableName && v.tableName === variable.tableName))

const excludeDependant = (row: Row, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

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
    } = ExpressionEvaluator.parseExpression(expressionNode)

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
