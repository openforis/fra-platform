import { Assessment } from './assessment'
import {
  AssessmentMetaCache,
  DependencyCache,
  DependencyRecord,
  VariableCache,
  VariablesByTableCache,
} from './assessmentMetaCache'
import { Cycle } from './cycle'

// ****==== types
type CycleProps = {
  assessment: Assessment
  cycle: Cycle
}

type VariableProps = CycleProps & {
  tableName: string
  variableName: string
}

type DependencyCacheProps = Pick<VariableProps, 'tableName' | 'variableName'> & {
  dependencyCache: DependencyCache
}

type DependencyRecordProps = Pick<VariableProps, 'tableName' | 'variableName'> & {
  dependencyRecord: DependencyRecord
}

// ****==== utils
const _getDeps = (props: DependencyRecordProps): Array<VariableCache> => {
  const { dependencyRecord, tableName, variableName } = props
  const dependants = dependencyRecord[tableName]?.[variableName]
  return [...(dependants ?? [])]
}

const _getDependants = (props: DependencyCacheProps) => {
  const { dependencyCache, tableName, variableName } = props
  return _getDeps({ dependencyRecord: dependencyCache.dependants, tableName, variableName })
}

const _getDependencies = (props: DependencyCacheProps) => {
  const { dependencyCache, tableName, variableName } = props
  return _getDeps({ dependencyRecord: dependencyCache.dependencies, tableName, variableName })
}

// ****==== getters
const getMetaCache = (props: CycleProps): AssessmentMetaCache => {
  const { assessment, cycle } = props
  return assessment.metaCache[cycle.uuid]
}

const getCalculations = (props: CycleProps): DependencyCache => getMetaCache(props).calculations

const getValidations = (props: CycleProps): DependencyCache => getMetaCache(props).validations

const getCalculationsDependants = (props: VariableProps) => {
  const { assessment, cycle, tableName, variableName } = props
  return _getDependants({ dependencyCache: getCalculations({ assessment, cycle }), tableName, variableName })
}

const getCalculationsDependencies = (props: VariableProps) => {
  const { assessment, cycle, tableName, variableName } = props
  return _getDependencies({ dependencyCache: getCalculations({ assessment, cycle }), tableName, variableName })
}

const getValidationsDependencies = (props: VariableProps) => {
  const { assessment, cycle, tableName, variableName } = props
  return _getDependencies({ dependencyCache: getValidations({ assessment, cycle }), tableName, variableName })
}

const getVariablesByTables = (props: CycleProps): VariablesByTableCache => getMetaCache(props).variablesByTable

export const AssessmentMetaCaches = {
  getCalculationsDependants,
  getCalculationsDependencies,
  getValidationsDependencies,
  getVariablesByTables,
}
