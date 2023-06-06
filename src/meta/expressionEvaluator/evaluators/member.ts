import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { AssessmentMetaCaches } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const { object, property } = expressionNode
    const { assessment, cycle, countryIso, colName: colNameContext, data } = this.context

    // @ts-ignore
    const isCol = Boolean(object?.object?.name)
    // @ts-ignore
    const objectName = isCol ? object?.object.name : object.name
    const variablesByTables = AssessmentMetaCaches.getVariablesByTables({ assessment, cycle })
    const tableNames = Object.keys(variablesByTables)
    const tableName = tableNames.find((table) => table === objectName)
    if (tableName) {
      // @ts-ignore
      const variableName = isCol ? object.property.name ?? object.property.value : property.name ?? property.value
      // @ts-ignore
      const colName = isCol ? property.name ?? property.value : colNameContext

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
