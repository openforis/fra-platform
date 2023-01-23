export type VariablesByTableCache = Record<string, Record<string, VariableCache>>

export interface VariableCache {
  tableName: string
  variableName: string
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
