import { MemberExpression } from '@openforis/arena-core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@openforis/arena-core/dist/expression/javascript/node/member'
import { Context } from './context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode
    const { assessment, countryIso, colName: colNameContext, data } = this.context

    // @ts-ignore
    const isCol = Boolean(object?.object?.name)
    // @ts-ignore
    const objectName = isCol ? object?.object.name : object.name
    const tableName = Object.keys(assessment.metaCache.variablesByTable).find((table) => table === objectName)
    if (tableName) {
      // @ts-ignore
      const variableName = isCol ? object?.property.name : property.name
      // @ts-ignore
      const colName = isCol ? property.value : colNameContext

      const node = data[countryIso]?.[tableName]?.[colName]?.[variableName]
      return node?.raw
    }

    return super.evaluate(expressionNode)
  }
}
