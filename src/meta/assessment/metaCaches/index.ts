// ****==== types
import { Assessment } from 'meta/assessment/assessment'
import { ColName } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import {
  AllColumnsDependencyKey,
  AssessmentMetaCache,
  DependencyCache,
  DependencyRecord,
  FullDependencyRecord,
  TableDependencyRecord,
  ValidationDependencyCache,
  VariableCache,
  VariablesCache,
} from 'meta/assessment/metaCache'
import { TableName } from 'meta/assessment/table'
import { VariableName } from 'meta/assessment/variable'

type CycleProps = {
  assessment: Assessment
  cycle: Cycle
}

type TableProps = CycleProps & {
  tableName: TableName
}
type VariableProps = TableProps & {
  variableName: VariableName
}
type ColProps = VariableProps & {
  colName: ColName
}
type ValidationsDependantsProps = ColProps & {
  includeAllColumnsDependants: boolean
}

type DependencyTableCacheProps = Pick<VariableProps, 'tableName'> & { dependencyCache: DependencyCache }
type DependencyCacheProps = Pick<VariableProps, 'variableName'> & DependencyTableCacheProps

type DependencyTableRecordProps = Pick<VariableProps, 'tableName'> & { dependencyRecord: DependencyRecord }
type ValidationTableDependants = FullDependencyRecord[TableName]
type VariableCacheList = Array<VariableCache>

// ****==== utils
const _getTableDeps = (props: DependencyTableRecordProps): TableDependencyRecord | undefined => {
  const { dependencyRecord, tableName } = props
  return dependencyRecord[tableName]
}

const _getTableDependants = (props: DependencyTableCacheProps): TableDependencyRecord => {
  const { dependencyCache, tableName } = props
  return _getTableDeps({ dependencyRecord: dependencyCache.dependants, tableName }) ?? {}
}
const _getDependants = (props: DependencyCacheProps): VariableCacheList =>
  _getTableDependants(props)?.[props.variableName] ?? []

const _getTableDependencies = (props: DependencyTableCacheProps): TableDependencyRecord => {
  const { dependencyCache, tableName } = props
  return _getTableDeps({ dependencyRecord: dependencyCache.dependencies, tableName }) ?? {}
}
const _getDependencies = (props: DependencyCacheProps): VariableCacheList =>
  _getTableDependencies(props)?.[props.variableName] ?? []

// ****==== getters
const getMetaCache = (props: CycleProps): AssessmentMetaCache => {
  const { assessment, cycle } = props
  return assessment.metaCache?.[cycle.uuid]
}

const getCalculations = (props: CycleProps): DependencyCache => getMetaCache(props).calculations

const getValidations = (props: CycleProps): ValidationDependencyCache => getMetaCache(props).validations

const getEnablers = (props: CycleProps): DependencyCache => getMetaCache(props).enablers

const getTableCalculationsDependants = (props: TableProps): TableDependencyRecord => {
  const { assessment, cycle, tableName } = props
  return _getTableDependants({ dependencyCache: getCalculations({ assessment, cycle }), tableName })
}
const getCalculationsDependants = (props: VariableProps): VariableCacheList =>
  getTableCalculationsDependants(props)?.[props.variableName] ?? []

const getTableCalculationsDependencies = (props: TableProps): TableDependencyRecord => {
  const { assessment, cycle, tableName } = props
  return _getTableDependencies({ dependencyCache: getCalculations({ assessment, cycle }), tableName })
}
const getCalculationsDependencies = (props: VariableProps): VariableCacheList =>
  getTableCalculationsDependencies(props)?.[props.variableName] ?? []

const getTableValidationsDependants = (props: TableProps): ValidationTableDependants => {
  const { assessment, cycle, tableName } = props
  return getValidations({ assessment, cycle }).dependants[tableName] ?? {}
}

const getValidationsDependants = (props: ValidationsDependantsProps): VariableCacheList => {
  const { colName, includeAllColumnsDependants, variableName } = props
  const dependantsByCol = getTableValidationsDependants(props)[variableName] ?? {}
  const columnDependants = dependantsByCol[colName] ?? []

  // Avoid adding the all-columns dependencies twice.
  if (!includeAllColumnsDependants || colName === AllColumnsDependencyKey) {
    return columnDependants
  }

  // maxForestArea() and maxLandArea() depend on the source variable across all columns.
  const allColumnsDependants = dependantsByCol[AllColumnsDependencyKey] ?? []

  return [...columnDependants, ...allColumnsDependants]
}

const getTableValidationsDependencies = (props: TableProps): TableDependencyRecord => {
  const { assessment, cycle, tableName } = props
  return _getTableDependencies({
    // the below cast is allowed because dependencies type are the same
    dependencyCache: getValidations({ assessment, cycle }) as unknown as DependencyCache,
    tableName,
  })
}
const getValidationsDependencies = (props: VariableProps): VariableCacheList =>
  getTableValidationsDependencies(props)?.[props.variableName] ?? []

const getEnablersDependants = (props: VariableProps): VariableCacheList => {
  const { assessment, cycle, tableName, variableName } = props
  return _getDependants({ dependencyCache: getEnablers({ assessment, cycle }), tableName, variableName })
}

const getEnablersDependencies = (props: VariableProps): VariableCacheList => {
  const { assessment, cycle, tableName, variableName } = props
  return _getDependencies({ dependencyCache: getEnablers({ assessment, cycle }), tableName, variableName })
}

const getVariablesByTables = (props: CycleProps): VariablesCache => getMetaCache(props).variablesByTable

const getCalculationMirrorVariable = (props: VariableProps): VariableCache | undefined => {
  const { assessment, cycle, tableName, variableName } = props
  const dependencies = getCalculationsDependencies({ assessment, cycle, tableName, variableName })
  return dependencies.find((dependency) => {
    let dependencyToReset: VariableCache
    // dependency must belong to a different table
    if (dependency.tableName === tableName) return undefined
    const mirrorDependencies = getCalculationsDependencies({
      assessment,
      cycle,
      tableName: dependency.tableName,
      variableName: dependency.variableName,
    })
    if (
      mirrorDependencies.find((mirrorDependency) => {
        return mirrorDependency.tableName === tableName && mirrorDependency.variableName === variableName
      })
    ) {
      dependencyToReset = dependency
    }
    return dependencyToReset
  })
}

export const AssessmentMetaCaches = {
  getCalculationMirrorVariable,
  getCalculationsDependants,
  getCalculationsDependencies,
  getMetaCache,
  getValidationsDependants,
  getValidationsDependencies,
  getVariablesByTables,
  getEnablersDependants,
  getEnablersDependencies,
  getTableCalculationsDependencies,
  getTableValidationsDependencies,
}
