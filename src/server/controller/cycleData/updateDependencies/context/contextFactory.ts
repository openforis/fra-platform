import { Country } from 'meta/area'
import {
  Assessment,
  AssessmentMetaCaches,
  ColName,
  Cycle,
  RowCacheKey,
  RowCaches,
  TableName,
  TableNames,
  VariableCache,
  VariableName,
} from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { isODPVariable } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RowRedisRepository } from 'server/repository/redis/row'

import { Context } from './context'

type Props = {
  assessment: Assessment
  cycle: Cycle
  isODP: boolean
  nodeUpdates: NodeUpdates
  includeSourceNodes?: boolean
}

export class ContextFactory {
  #country: Country
  readonly #props: Props
  readonly #queue: Array<VariableCache>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<string>
  readonly #visitedVariables: Array<VariableCache>
  // TODO: use this object when refactoring getTableData tables condition input prop (and uncomment related code below)
  // readonly #tables: TablesCondition

  private constructor(props: Props) {
    this.#props = props
    this.#queue = []
    this.#rowKeys = new Set<RowCacheKey>()
    // this.#tables = {}
    this.#tableNames = new Set<string>()
    this.#visitedVariables = []
  }

  // keep track of which table data to fetch
  #addTableCondition(props: { tableName: TableName; variableName: VariableName }): void {
    const { tableName, variableName } = props
    const { assessment, cycle } = this.#props
    // this.#tables[tableName] = {}
    this.#tableNames.add(tableName)

    const propsDependencies = { assessment, cycle, tableName, variableName }
    const dependencies = AssessmentMetaCaches.getCalculationsDependencies(propsDependencies)
    dependencies.forEach((dependency) => {
      this.#tableNames.add(dependency.tableName)
    })
  }

  // check whether a variable must be added to the queue
  #mustAddToQueue(variable: VariableCache): boolean {
    const { tableName } = variable
    const { cycle, isODP } = this.#props
    const { useOriginalDataPoint } = this.#country.props.forestCharacteristics

    if (isODP && isODPVariable(cycle, variable)) {
      if (tableName === TableNames.extentOfForest) return false
      if (tableName === TableNames.forestCharacteristics) return !useOriginalDataPoint
    }

    return true
  }

  // check whether a variable has been added to the queue
  #isInQueue(variable: VariableCache): boolean {
    const { variableName, tableName, colName } = variable
    return Boolean(
      this.#queue.find(
        (processed) =>
          processed.tableName === tableName && processed.variableName === variableName && processed.colName === colName
      )
    )
  }

  // add a variable to the queue
  #addToQueue(variable: VariableCache): void {
    this.#queue.push(variable)
    this.#addTableCondition(variable)
    this.#rowKeys.add(RowCaches.getKey(variable)) // keep track of which rows must be fetched
  }

  // add node dependants to queue. Returns true if input node is dependant of itself, false otherwise
  #addDependantsToQueue(props: { tableName: TableName; variableName: VariableName; colName: ColName }): boolean {
    const { tableName, variableName, colName } = props
    const { assessment, cycle, includeSourceNodes } = this.#props

    if (includeSourceNodes) this.#addToQueue(props)

    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    dependants.forEach((variable) => {
      const dependant = { tableName: variable.tableName, variableName: variable.variableName, colName }

      if (!this.#isInQueue(dependant) && this.#mustAddToQueue(dependant)) {
        this.#addToQueue(dependant)
        this.#addDependantsToQueue(dependant)
      }
    })

    return Boolean(
      dependants.find((dependant) => dependant.variableName === variableName && dependant.tableName === tableName)
    )
  }

  async #initQueue(): Promise<void> {
    const { assessment, cycle, nodeUpdates } = this.#props
    const { countryIso, nodes } = nodeUpdates

    this.#country = await CountryRepository.getOne({ assessment, cycle, countryIso })

    nodes.forEach((node) => {
      const { tableName, variableName, colName } = node
      this.#addTableCondition({ tableName, variableName })
      const selfIsDependant = this.#addDependantsToQueue({ tableName, variableName, colName })
      // if self is not dependant of itself, mark it as visited
      if (!selfIsDependant) {
        this.#visitedVariables.push({ variableName, tableName, colName })
      }
    })
  }

  async #createContext(): Promise<Context> {
    const { assessment, cycle, nodeUpdates } = this.#props
    const { countryIso } = nodeUpdates
    const queue = this.#queue
    const visitedVariables = this.#visitedVariables
    const tableNames = Array.from(this.#tableNames)

    const data = await getTableData({ assessment, cycle, countryISOs: [countryIso], tableNames, mergeOdp: true })
    const rows = await RowRedisRepository.getRows({ assessment, rowKeys: Array.from(this.#rowKeys) })

    return new Context({ assessment, cycle, countryIso, data, queue, rows, visitedVariables })
  }

  static async newInstance(props: Props): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initQueue()
    return factory.#createContext()
  }
}
