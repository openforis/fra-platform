import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { AssessmentMetaCaches } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { parseMemberVariable } from 'meta/expressionEvaluator/util/parseMemberVariable'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const { assessment, cycle, countryIso, colName: colNameContext, data } = this.context

    const memberVariable = parseMemberVariable(expressionNode)

    const variablesByTables = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })
    const tableNames = Object.keys(variablesByTables)
    const tableName = tableNames.find((table) => table === memberVariable.tableName)
    if (tableName) {
      return RecordAssessmentDatas.getDatum({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        data,
        countryIso,
        tableName,
        variableName: memberVariable.variableName,
        colName: memberVariable.colName ?? colNameContext,
      })
    }

    return super.evaluate(expressionNode)
  }
}
