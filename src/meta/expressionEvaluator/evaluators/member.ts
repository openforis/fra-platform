import { Assessments } from 'meta/assessment/assessments'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { BaseContext, Context } from 'meta/expressionEvaluator/context'
import { Member } from 'meta/expressionEvaluator/member'
import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { MemberEvaluator as MemberEvaluatorBase } from 'lib/expressionEvaluator/javascript/node/member'
import { MemberExpression } from 'lib/expressionEvaluator/node'

type Returned = string | undefined

export class MemberEvaluator extends MemberEvaluatorBase<Context, Returned> {
  evaluate(expressionNode: MemberExpression): Returned {
    const {
      // assessment: assessmentContext,
      assessmentName: assessmentNameContext,
      assessments,
      colName: colNameContext,
      countryIso,
      cycleName: cycleNameContext,
      // cycle: cycleContext,
      data,
    } = this.context

    const baseContext: BaseContext = { assessments, assessmentName: assessmentNameContext, cycleName: cycleNameContext }

    // @ts-ignore
    if (expressionNode.object.name === Member.$country) {
      // @ts-ignore
      return this.context.country[expressionNode.property.name]
    }

    const memberVariable = parseMemberVariable(expressionNode, baseContext)
    const memberAssessmentName = memberVariable.assessmentName
    const memberCycleName = memberVariable.cycleName

    // const externalVariable = Boolean(
    //   ((memberAssessmentName && memberAssessmentName !== assessmentNameContext) ||
    //     (memberCycleName && memberCycleName !== cycleNameContext)) &&
    //     this.context.assessments
    // )

    const assessment = this.context.assessments[memberAssessmentName]
    const cycle = Assessments.getCycle({ assessment, cycleName: memberCycleName })

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
