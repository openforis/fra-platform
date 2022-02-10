import { ExpressionNodeEvaluator, MemberExpression } from '@arena/core'
import { Context } from './context'
import { VariableCache } from '../../../../../meta/assessment'

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): any {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, variablesByTable } = this.context
    const tableName = Object.entries(variablesByTable).find(([_, variables]) =>
      Object.values(variables).find((variable) => variable.name === row.props.variableName)
    )[0]

    const dependants = assessmentMetaCache.calculations.dependants[property.name] ?? []
    const dependant: VariableCache = { name: row.props.variableName, tableName }
    if (!dependants.find((d) => d.name === dependant.name)) {
      assessmentMetaCache.calculations.dependants = {
        ...assessmentMetaCache.calculations.dependants,
        [property.name]: [...dependants, dependant],
      }
    }

    const dependencies = assessmentMetaCache.calculations.dependencies[row.props.variableName] ?? []
    const dependency: VariableCache = { name: property.name, tableName: object.name }
    if (!dependencies.find((d) => d.name === dependency.name)) {
      assessmentMetaCache.calculations.dependencies = {
        ...assessmentMetaCache.calculations.dependencies,
        [row.props.variableName]: [...dependencies, dependency],
      }
    }

    const evaluateObject = this.evaluator.evaluateNode(object, this.context)
    const evaluateProperty = this.evaluator.evaluateNode(property, this.context)
    return `${evaluateObject}.${evaluateProperty}`
  }
}
