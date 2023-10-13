import { AssessmentName } from './assessmentName'
import { CycleName } from './cycle'
import { VariableName } from './row'
import { TableName } from './table'

export interface VariableCache {
  assessmentName?: AssessmentName
  cycleName?: CycleName
  tableName: TableName
  variableName: VariableName
  colName?: string // TODO: will colName become mandatory when handling dependencies by col ?
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

export type DependencyRecord = Record<string, Record<string, Array<VariableCache>>>

export type DependencyCache = {
  dependencies: DependencyRecord
  dependants: DependencyRecord
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  validations: DependencyCache
  variablesByTable: VariablesCache
}
