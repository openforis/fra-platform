import { MemberExpression } from '@arena/core'
import { MemberEvaluator as ArenaMemberEvaluator } from '@arena/core/dist/expression/javascript/node/member'
import { Context } from './context'

export class MemberEvaluator extends ArenaMemberEvaluator<Context> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode
    const { assessment, countryIso, colName, data } = this.context

    // @ts-ignore
    const tableName = Object.keys(assessment.metaCache.variablesByTable).find((table) => table === object.name)
    if (tableName) {
      // @ts-ignore
      const datum = data[countryIso]?.[tableName]?.[property.name]
      return datum?.[colName]?.raw
    }

    return super.evaluate(expressionNode)
  }
}
