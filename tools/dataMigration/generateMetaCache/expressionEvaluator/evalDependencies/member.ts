import { ExpressionNodeEvaluator, MemberExpression } from '@arena/core'
import { Context } from './context'
import { VariableCache } from '../../../../../meta/assessment/assessmentMetaCache'

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, tableName } = this.context

    const dependantTable = assessmentMetaCache.calculations.dependants?.[object.name] ?? {}
    const dependants = dependantTable[property.name] ?? []
    const dependant: VariableCache = { variableName: row.props.variableName, tableName }
    if (!dependants.find((d) => d.variableName === dependant.variableName)) {
      assessmentMetaCache.calculations.dependants = {
        ...assessmentMetaCache.calculations.dependants,
        [object.name]: {
          ...dependantTable,
          [property.name]: [...dependants, dependant],
        },
      }
    }

    const dependencyTable = assessmentMetaCache.calculations.dependencies?.[tableName] ?? {}
    const dependencies = dependencyTable[row.props.variableName] ?? []
    const dependency: VariableCache = { variableName: property.name, tableName: object.name }
    if (!dependencies.find((d) => d.variableName === dependency.variableName)) {
      assessmentMetaCache.calculations.dependencies = {
        ...assessmentMetaCache.calculations.dependencies,
        [tableName]: {
          ...dependencyTable,
          [row.props.variableName]: [...dependencies, dependency],
        },
      }
    }

    const evaluateObject = this.evaluator.evaluateNode(object, this.context)
    const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
    return `${evaluateObject}.${evaluateProperty}`
  }
}
