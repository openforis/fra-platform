import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { AssessmentMetaCaches, Cycle } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const {
      assessment: assessmentContext,
      cycle: cycleContext,
      countryIso,
      colName: colNameContext,
      data,
    } = this.context

    const memberVariable = parseMemberVariable(expressionNode)
    const memberAssessmentName = memberVariable.assessmentName
    const memberCycleName = memberVariable.cycleName

    const externalVariable = Boolean(
      memberAssessmentName && memberAssessmentName !== assessmentContext.props.name && this.context.assessments
    )

    const assessment = externalVariable ? this.context.assessments[memberAssessmentName] : assessmentContext
    const cycle = externalVariable ? assessment.cycles.find((c: Cycle) => c.name === memberCycleName) : cycleContext
    const variablesByTables = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })

    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const { tableName, variableName, colName: memberColName } = memberVariable
    const colName = memberColName ?? colNameContext

    if (tableName in variablesByTables) {
      const propsDatum = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
      return RecordAssessmentDatas.getDatum(propsDatum)
    }

    return super.evaluate(expressionNode)
  }
}
