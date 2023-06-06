import { ExpressionNodeEvaluator, MemberExpression } from '@openforis/arena-core'

import { Row, VariableCache } from 'meta/assessment'

import { Context } from './context'

const includesVariableCache = (variables: Array<VariableCache>, variable: VariableCache): boolean =>
  Boolean(variables.find((v) => v.variableName === variable.variableName && v.tableName === variable.tableName))

const excludeDependant = (row: Row, tableName: string, variableName: string): boolean =>
  Boolean(row.props?.dependantsExclude?.find((v) => v.tableName === tableName && v.variableName === variableName))

export class MemberEvaluator extends ExpressionNodeEvaluator<Context, MemberExpression> {
  evaluate(expressionNode: MemberExpression): string {
    const { object, property } = expressionNode

    const { assessmentMetaCache, row, tableName, type } = this.context

    // @ts-ignore
    const objectName = object?.object?.name ?? object.name
    // @ts-ignore
    const propertyName = object?.property?.name ?? property.name

    if (assessmentMetaCache.variablesByTable[objectName]) {
      const dependantTable = assessmentMetaCache[type].dependants?.[objectName] ?? {}
      const dependants = dependantTable[propertyName] ?? []
      const dependant: VariableCache = { variableName: row.props.variableName, tableName }
      if (!excludeDependant(row, objectName, propertyName) && !includesVariableCache(dependants, dependant)) {
        assessmentMetaCache[type].dependants = {
          ...assessmentMetaCache[type].dependants,
          // @ts-ignore
          [objectName]: {
            ...dependantTable,
            // @ts-ignore
            [propertyName]: [...dependants, dependant],
          },
        }
      }

      const dependencyTable = assessmentMetaCache[type].dependencies?.[tableName] ?? {}
      const dependencies = dependencyTable[row.props.variableName] ?? []
      // @ts-ignore
      const dependency: VariableCache = { variableName: propertyName, tableName: objectName }
      if (!includesVariableCache(dependencies, dependency)) {
        assessmentMetaCache[type].dependencies = {
          ...assessmentMetaCache[type].dependencies,
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
    return `${objectName}.${propertyName}`
  }
}
