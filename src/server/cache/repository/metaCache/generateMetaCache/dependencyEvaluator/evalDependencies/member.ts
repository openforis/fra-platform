import { Assessments } from 'meta/assessment/assessments'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RowCache } from 'meta/assessment/rowCache'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Objects } from 'utils/objects'

import { ExpressionNodeEvaluator, MemberExpression } from 'lib/expressionEvaluator/node'

import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'

const _includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(
    variables.find(
      (v) =>
        v.variableName === variable.variableName &&
        v.tableName === variable.tableName &&
        v.assessmentName === variable.assessmentName &&
        v.cycleName === variable.cycleName &&
        v.colName === variable.colName
    )
  )

const _excludeDependant = (row: RowCache, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const memberVariable = ExpressionEvaluator.parseMemberVariable(expressionNode, this.context)

    this.#addDependant(memberVariable)
    this.#addDependency(memberVariable)

    return `${memberVariable.tableName}.${memberVariable.variableName}`
  }

  #variableExists(variable: VariableCache): boolean {
    const { assessmentName, assessments, cycleName } = this.context

    const assessment = assessments[variable.assessmentName ?? assessmentName]
    const cycle = Assessments.getCycle({ assessment, cycleName: variable.cycleName ?? cycleName })
    const variablesCache = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })

    return Boolean(variablesCache[variable.tableName])
  }

  #addDependant(variable: VariableCache): void {
    const { assessmentName, assessments, col, cycleName, row, type } = this.context

    if (this.#variableExists(variable) && !_excludeDependant(row, variable.tableName, variable.variableName)) {
      const assessment = assessments[variable.assessmentName ?? assessmentName]
      const cycle = Assessments.getCycle({ assessment, cycleName: variable.cycleName ?? cycleName })
      const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

      const propsDependants = { assessment, cycle, tableName: variable.tableName, variableName: variable.variableName }
      const colName = variable.colName ?? col?.props?.colName
      let dependants
      if (type === 'calculations') {
        dependants = AssessmentMetaCaches.getCalculationsDependants(propsDependants)
      } else if (type === 'enablers') {
        dependants = AssessmentMetaCaches.getEnablersDependants(propsDependants)
      } else if (type === 'validations') {
        // Prevent validating nodes from other asessments/cycles
        if (assessment.props.name !== assessmentName || cycle.name !== cycleName) return

        dependants = AssessmentMetaCaches.getValidationsDependants({
          ...propsDependants,
          colName,
          includeAllColumnsDependants: false, // Graph generation must read only this column's dependants.
        })
      }
      const external = assessmentName !== assessment.props.name
      const dependant: VariableCache = {
        assessmentName: external ? assessmentName : undefined,
        cycleName: external ? cycleName : undefined,
        tableName: row.tableName,
        variableName: row.props.variableName,
      }

      if (col) {
        dependant.colName = col.props.colName
      }

      if (!_includesVariableCache(dependants, dependant)) {
        const path = [type, 'dependants', variable.tableName, variable.variableName]
        if (type === 'validations') path.push(colName)

        Objects.setInPath({ obj: metaCache, path, value: [...dependants, dependant] })
      }
    }
  }

  #addDependency(variable: VariableCache): void {
    const { assessmentName, assessments, cycleName, row, type } = this.context
    const { tableName } = row
    const { variableName } = row.props

    if (this.#variableExists(variable)) {
      const assessment = assessments[assessmentName]
      const cycle = Assessments.getCycle({ assessment, cycleName })
      const metaCache = AssessmentMetaCaches.getMetaCache({ assessment, cycle })

      const propsDependency = { assessment, cycle, tableName, variableName }
      let dependencies
      if (type === 'calculations') {
        dependencies = AssessmentMetaCaches.getCalculationsDependencies(propsDependency)
      } else if (type === 'enablers') {
        dependencies = AssessmentMetaCaches.getEnablersDependencies(propsDependency)
      } else {
        dependencies = AssessmentMetaCaches.getValidationsDependencies(propsDependency)
      }

      if (!_includesVariableCache(dependencies, variable)) {
        const path = [type, 'dependencies', tableName, variableName]
        Objects.setInPath({ obj: metaCache, path, value: [...dependencies, variable] })
      }
    }
  }
}
