import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { AssessmentMetaCaches } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { BaseContext } from 'meta/expressionEvaluator/util/_types'
import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const {
      assessments,
      assessment: assessmentContext,
      cycle: cycleContext,
      countryIso,
      colName: colNameContext,
      data,
    } = this.context

    const baseContext: BaseContext = {
      assessments,
      assessmentName: assessmentContext.props.name,
      cycleName: cycleContext.name,
    }

    const memberVariable = parseMemberVariable(expressionNode, baseContext)
    const memberAssessmentName = memberVariable.assessmentName
    const memberCycleName = memberVariable.cycleName

    const externalVariable = Boolean(
      ((memberAssessmentName && memberAssessmentName !== assessmentContext.props.name) ||
        (memberCycleName && memberCycleName !== cycleContext.name)) &&
        this.context.assessments
    )

    const assessment = externalVariable ? this.context.assessments[memberAssessmentName] : assessmentContext
    const cycle = externalVariable ? assessment.cycles.find((c) => c.name === memberCycleName) : cycleContext

    // client side validations: metaCache can be null if not fetched yet
    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      return null
    }

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
