export type VariablesByTableCache = Record<string, Record<string, VariableCache>>

export interface VariableCache {
  name: string
  tableName: string
}

export type DependencyCache = {
  /**
   * { [tableName] : { [variableName] : [{name,tableName}] } }
   */
  dependants: Record<string, Record<string, Array<VariableCache>>>
  dependencies: Record<string, Record<string, Array<VariableCache>>>
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
  variablesByTable: VariablesByTableCache
}
