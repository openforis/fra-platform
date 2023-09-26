import { Country } from 'meta/area'
import {
  AssessmentMetaCaches,
  ColName,
  RowCacheKey,
  RowCaches,
  TableName,
  TableNames,
  VariableCache,
  VariableName,
} from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { isODPVariable } from 'server/controller/cycleData/getOriginalDataPointVariables'
import { getTableData } from 'server/controller/cycleData/getTableData'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RowRedisRepository } from 'server/repository/redis/row'

import { Context } from './context'

type Props = {
  isODP: boolean
  nodeUpdates: NodeUpdates
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
    const { assessment, cycle } = this.#props.nodeUpdates
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
    const { isODP, nodeUpdates } = this.#props
    const { useOriginalDataPoint } = this.#country.props.forestCharacteristics

    if (isODP && isODPVariable(nodeUpdates.cycle, variable)) {
      if (tableName === TableNames.extentOfForest) return false
      if (tableName === TableNames.forestCharacteristics) return !useOriginalDataPoint
    }

    return true
  }

  #isInQueue(variable: VariableCache): boolean {
    const { variableName, tableName, colName } = variable
    return Boolean(
      this.#queue.find(
        (processed) =>
          processed.tableName === tableName && processed.variableName === variableName && processed.colName === colName
      )
    )
  }

  // add node dependants to queue. Returns true if input node is dependant of itself, false otherwise
  #addDependantsToQueue(props: { tableName: TableName; variableName: VariableName; colName: ColName }): boolean {
    const { tableName, variableName, colName } = props
    const { assessment, cycle } = this.#props.nodeUpdates

    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    dependants.forEach((variable) => {
      const dependant = { tableName: variable.tableName, variableName: variable.variableName, colName }

      if (!this.#isInQueue(dependant) && this.#mustAddToQueue(dependant)) {
        this.#queue.push(dependant)
        this.#addTableCondition(dependant)
        this.#rowKeys.add(RowCaches.getKey(dependant))

        this.#addDependantsToQueue(dependant)
      }
    })

    return Boolean(
      dependants.find((dependant) => dependant.variableName === variableName && dependant.tableName === tableName)
    )
  }

  async #initQueue(): Promise<void> {
    const { assessment, cycle, countryIso, nodes } = this.#props.nodeUpdates

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
    const { assessment, cycle, countryIso } = this.#props.nodeUpdates
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
