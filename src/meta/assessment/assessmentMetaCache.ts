import { AssessmentName } from 'meta/assessment/assessmentName'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { VariableName } from 'meta/assessment/row'
import { TableName } from 'meta/assessment/table'

export interface VariableCache {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  tableName: TableName
  variableName: VariableName
  colName?: ColName // TODO: will colName become mandatory when handling dependencies by col ?
}

/**
 * {
 *    [tableName]: {
 *        [variableName] : [
 *          {variableName,tableName},
 *          {...},
 *          ...
 *        ]
 *    }
 * }
 */
export type VariablesCache = Record<TableName, Record<VariableName, VariableCache>>

export type DependencyRecord = Record<TableName, Record<VariableName, Array<VariableCache>>>

export type DependencyCache = {
  dependencies: DependencyRecord
  dependants: DependencyRecord
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  validations: DependencyCache
  variablesByTable: VariablesCache
}
