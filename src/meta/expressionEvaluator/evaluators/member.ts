import { Assessments } from 'meta/assessment/assessments'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Member } from 'meta/expressionEvaluator/member'
import { BaseContext } from 'meta/expressionEvaluator/util/_types'
import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { MemberEvaluator as ArenaMemberEvaluator } from 'lib/expressionEvaluator/javascript/node/member'
import { MemberExpression } from 'lib/expressionEvaluator/node'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const {
      assessment: assessmentContext,
      assessments,
      colName: colNameContext,
      countryIso,
      cycle: cycleContext,
      data,
    } = this.context

    const baseContext: BaseContext = {
      assessments,
      assessmentName: assessmentContext.props.name,
      cycleName: cycleContext.name,
    }

    // @ts-ignore
    if (expressionNode.object.name === Member.$country) {
      // @ts-ignore
      return this.context.country[expressionNode.property.name]
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
    const cycle = externalVariable ? Assessments.getCycle({ assessment, cycleName: memberCycleName }) : cycleContext

    // client side validations: metaCache can be null if not fetched yet
    if (!AssessmentMetaCaches.getMetaCache({ assessment, cycle })) {
      return null
    }

    const variablesByTables = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const { colName: memberColName, tableName, variableName } = memberVariable
    const colName = memberColName ?? colNameContext

    if (tableName in variablesByTables) {
      const propsDatum = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
      return RecordAssessmentDatas.getDatum(propsDatum)
    }

    return super.evaluate(expressionNode)
  }
}
