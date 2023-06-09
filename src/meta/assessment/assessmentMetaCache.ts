import { AssessmentName } from './assessmentName'
import { CycleName } from './cycle'
import { VariableName } from './row'
import { TableName } from './table'

export type VariablesByTableCache = Record<string, Record<string, VariableCache>>

export interface VariableCache {
  tableName: TableName
  variableName: VariableName
  cycleName?: CycleName
  assessmentName?: AssessmentName
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
export type DependencyRecord = Record<string, Record<string, Array<VariableCache>>>

export type DependencyCache = {
  dependencies: DependencyRecord
  dependants: DependencyRecord
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  validations: DependencyCache
  variablesByTable: VariablesByTableCache
}
