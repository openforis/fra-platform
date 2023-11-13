import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'
import { Objects } from 'utils/objects'

import { AssessmentMetaCaches, RowCache, VariableCache } from 'meta/assessment'
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

const _excludeDependant = (row: RowCache, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const memberVariable = ExpressionEvaluator.parseMemberVariable(expressionNode)

    this.#addDependant(memberVariable)
    this.#addDependency(memberVariable)

    return `${memberVariable.tableName}.${memberVariable.variableName}`
  }

  #variableExists(variable: VariableCache): boolean {
    const { assessments, assessmentName, cycleName } = this.context

    const assessment = assessments.find((a) => a.props.name === (variable.assessmentName ?? assessmentName))
    const cycle = assessment.cycles.find((c) => c.name === (variable.cycleName ?? cycleName))
    const variablesCache = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })

    return Boolean(variablesCache[variable.tableName])
  }

  #addDependant(variable: VariableCache): void {
    const { assessments, assessmentName, cycleName, row, type } = this.context

    if (this.#variableExists(variable) && !_excludeDependant(row, variable.tableName, variable.variableName)) {
      const assessment = assessments.find((a) => a.props.name === (variable.assessmentName ?? assessmentName))
      const cycle = assessment.cycles.find((c) => c.name === (variable.cycleName ?? cycleName))
      const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

      const propsDependants = { assessment, cycle, tableName: variable.tableName, variableName: variable.variableName }
      const dependants =
        type === 'calculations'
          ? AssessmentMetaCaches.getCalculationsDependants(propsDependants)
          : AssessmentMetaCaches.getValidationsDependants(propsDependants)
      const dependant: VariableCache = {
        assessmentName: assessmentName !== assessment.props.name ? assessmentName : undefined,
        cycleName: cycleName !== cycle.name ? cycleName : undefined,
        tableName: row.tableName,
        variableName: row.props.variableName,
      }

      if (!_includesVariableCache(dependants, dependant)) {
        const path = [type, 'dependants', variable.tableName, variable.variableName]
        Objects.setInPath({ obj: metaCache, path, value: [...dependants, dependant] })
      }
    }
  }

  #addDependency(variable: VariableCache): void {
    const { assessments, assessmentName, cycleName, row, type } = this.context
    const { tableName } = row
    const { variableName } = row.props

    if (this.#variableExists(variable)) {
      const assessment = assessments.find((a) => a.props.name === assessmentName)
      const cycle = assessment.cycles.find((c) => c.name === cycleName)
      const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

      const propsDependency = { assessment, cycle, tableName, variableName }
      const dependencies =
        type === 'calculations'
          ? AssessmentMetaCaches.getCalculationsDependencies(propsDependency)
          : AssessmentMetaCaches.getValidationsDependencies(propsDependency)

      if (!_includesVariableCache(dependencies, variable)) {
        const path = [type, 'dependencies', tableName, variableName]
        Objects.setInPath({ obj: metaCache, path, value: [...dependencies, variable] })
      }
    }
  }
}
