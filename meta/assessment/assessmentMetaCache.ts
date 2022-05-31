export type VariablesByTableCache = Record<string, Record<string, VariableCache>>

export interface VariableCache {
  variableName: string
  tableName: string
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
  dependants: Record<string, Record<string, Array<VariableCache>>>
  dependencies: Record<string, Record<string, Array<VariableCache>>>
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  // validations: DependencyCache
  variablesByTable: VariablesByTableCache
}
