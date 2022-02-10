export interface VariableCache {
  name: string
  tableName: string
}

export type DependencyCache = {
  dependants: Record<string, Array<VariableCache>>
  dependencies: Record<string, Array<VariableCache>>
}

export interface AssessmentMetaCache {
  calculations: DependencyCache
}
