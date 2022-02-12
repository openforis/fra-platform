import { ExpressionNodeEvaluator, IdentifierExpression } from '@arena/core'
import { VariableCache } from '../../../../../meta/assessment'
import { Context } from './context'

export class IdentifierEvaluator extends ExpressionNodeEvaluator<Context, IdentifierExpression> {
  evaluate(expressionNode: IdentifierExpression): any {
    const { name } = expressionNode

    const { assessmentMetaCache, row, variablesCache } = this.context
    const variableCache = variablesCache[name]
    if (variableCache) {
      const dependants = assessmentMetaCache.calculations.dependants[name] ?? []
      const dependant: VariableCache = {
        name: row.props.variableName,
        tableName: variablesCache[row.props.variableName].tableName,
      }
      if (!dependants.find((d) => d.name === dependant.name)) {
        assessmentMetaCache.calculations.dependants = {
          ...assessmentMetaCache.calculations.dependants,
          [name]: [...dependants, dependant],
        }
      }

      const dependencies = assessmentMetaCache.calculations.dependencies[row.props.variableName] ?? []
      const dependency: VariableCache = { name, tableName: variablesCache[name].tableName }
      if (!dependencies.find((d) => d.name === dependency.name)) {
        assessmentMetaCache.calculations.dependencies = {
          ...assessmentMetaCache.calculations.dependencies,
          [row.props.variableName]: [...dependencies, dependency],
        }
      }
    }

    return name
  }
}
