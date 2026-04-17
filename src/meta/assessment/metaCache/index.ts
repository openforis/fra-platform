import { AssessmentName } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { CycleName } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

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

export type TableDependencyRecord = Record<VariableName, Array<VariableCache>>
export type DependencyRecord = Record<TableName, TableDependencyRecord>

export type ValidationTargetsBySource = Record<TableName, Record<VariableName, Record<ColName, Array<VariableCache>>>>

export type DependencyCache = {
  dependencies: DependencyRecord
  dependants: DependencyRecord
}

export type ValidationDependencyCache = {
  dependencies: DependencyRecord
  dependants: ValidationTargetsBySource
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  validations: ValidationDependencyCache
  enablers?: DependencyCache
  variablesByTable: VariablesCache
}
