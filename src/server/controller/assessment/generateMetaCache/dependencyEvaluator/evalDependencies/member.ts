import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'

import { Row, VariableCache } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { Context } from './context'

const includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(variables.find((v) => v.variableName === variable.variableName && v.tableName === variable.tableName))

const excludeDependant = (row: Row, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { assessmentMetaCache, row, tableName, type } = this.context

    const memberVariable = ExpressionEvaluator.parseMemberVariable(expressionNode)

    const { tableName: _tableName, variableName: _variableName } = memberVariable

    if (assessmentMetaCache.variablesByTable[memberVariable.tableName]) {
      const dependantTable = assessmentMetaCache[type].dependants?.[memberVariable.tableName] ?? {}
      const dependants = dependantTable[memberVariable.variableName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }
      if (
        !excludeDependant(row, memberVariable.tableName, memberVariable.variableName) &&
        !includesVariableCache(dependants, dependant)
      ) {
        assessmentMetaCache[type].dependants = {
          ...assessmentMetaCache[type].dependants,
          [_tableName]: {
            ...dependantTable,
            [_variableName]: [...dependants, dependant],
          },
        }
      }

      const dependencyTable = assessmentMetaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []
      const dependency: VariableCache = { variableName: _variableName, tableName: _tableName }

      if (memberVariable.assessmentName && memberVariable.cycleName) {
        dependency.assessmentName = memberVariable.assessmentName
        dependency.cycleName = memberVariable.cycleName
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

      return `${tableName}.${memberVariable.variableName}`
    }
    return `${memberVariable.tableName}.${memberVariable.variableName}`
  }
}
