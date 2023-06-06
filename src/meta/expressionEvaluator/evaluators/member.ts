import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { AssessmentMetaCaches } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { Context } from '../context'
import { parseExpression } from '../util/parseExpression'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const { assessment, cycle, countryIso, colName: colNameContext, data } = this.context

    const { tableName: _tableName, variableName, colName = colNameContext } = parseExpression(expressionNode)

    const variablesByTables = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })
    const tableNames = Object.keys(variablesByTables)
    const tableName = tableNames.find((table) => table === _tableName)
    if (tableName) {
      return RecordAssessmentDatas.getDatum({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        data,
        countryIso,
        tableName,
        variableName,
        colName,
      })
    }

    return super.evaluate(expressionNode)
  }
}
