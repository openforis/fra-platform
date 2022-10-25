export type VariablesByTableCache = Record<string, Record<string, VariableCache>>

export interface VariableCache {
  tableName: string
  variableName: string
  colName?: string
}

export type DependencyCache = {
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
  dependencies: Record<string, Record<string, Array<VariableCache>>>
  dependants: Record<string, Record<string, Array<VariableCache>>>
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  validations: DependencyCache
  variablesByTable: VariablesByTableCache
}
