import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'

import { TableDatas } from '@meta/data'

import { Context } from '../context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): string | undefined {
    const { object, property } = expressionNode
    const { assessment, countryIso, colName: colNameContext, data } = this.context

    // @ts-ignore
    const isCol = Boolean(object?.object?.name)
    // @ts-ignore
    const objectName = isCol ? object?.object.name : object.name
    const tableName = Object.keys(assessment.metaCache.variablesByTable).find((table) => table === objectName)
    if (tableName) {
      // @ts-ignore
      const variableName = isCol ? object.property.name ?? object.property.value : property.name ?? property.value
      // @ts-ignore
      const colName = isCol ? property.value : colNameContext

      return TableDatas.getDatum({ data, countryIso, tableName, variableName, colName })
    }

    return super.evaluate(expressionNode)
  }
}
