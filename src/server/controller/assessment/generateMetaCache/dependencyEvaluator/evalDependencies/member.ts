import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'
import { Objects } from 'utils/objects'

import { Row, VariableCache } from 'meta/assessment'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { Context } from './context'

const _includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(
    variables.find(
      (v) =>
        v.variableName === variable.variableName &&
        v.tableName === variable.tableName &&
        v.assessmentName === variable.assessmentName &&
        v.cycleName === variable.cycleName
    )
  )

const _excludeDependant = (row: Row, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { assessments, assessmentName, cycleName, row, type } = this.context

    const assessment = assessments.find((a) => a.props.name === assessmentName)
    const cycle = assessment.cycles.find((c) => c.name === cycleName)
    const metaCache = assessment.metaCache[cycle.uuid]
    const { tableName } = row

    const memberVariable = ExpressionEvaluator.parseMemberVariable(expressionNode)

    if (metaCache.variablesByTable[memberVariable.tableName]) {
      const dependantTable = metaCache[type].dependants?.[memberVariable.tableName] ?? {}
      const dependants = dependantTable[memberVariable.variableName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }

      if (
        !_excludeDependant(row, memberVariable.tableName, memberVariable.variableName) &&
        !_includesVariableCache(dependants, dependant)
      ) {
        const path = [type, 'dependants', memberVariable.tableName, memberVariable.variableName]
        Objects.setInPath({ obj: metaCache, path, value: [...dependants, dependant] })
      }

      const dependencyTable = metaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []

      if (!_includesVariableCache(dependencies, memberVariable)) {
        const path = [type, 'dependencies', tableName, row.props.variableName]
        Objects.setInPath({ obj: metaCache, path, value: [...dependencies, memberVariable] })
      }

      return `${tableName}.${memberVariable.variableName}`
    }
    // console.log('============ ', memberVariable)

    return `${memberVariable.tableName}.${memberVariable.variableName}`
  }
}
