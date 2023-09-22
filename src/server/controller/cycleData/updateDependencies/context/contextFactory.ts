import { Country } from 'meta/area'
import { AssessmentMetaCaches, TableName, TableNames, VariableCache } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'

import { isODPVariable } from 'server/controller/cycleData/getOriginalDataPointVariables'
import { getTableData } from 'server/controller/cycleData/getTableData'
import { CountryRepository } from 'server/repository/assessmentCycle/country'

import { Context } from './context'

type Props = {
  isODP: boolean
  nodeUpdates: NodeUpdates
}

export class ContextFactory {
  #country: Country
  readonly #props: Props
  readonly #queue: Array<VariableCache>
  readonly #tableNames: Set<string>
  readonly #visitedVariables: Array<VariableCache>
  // TODO: use this object when refactoring getTableData tables condition input prop (and uncomment related code below)
  // readonly #tables: TablesCondition

  private constructor(props: Props) {
    this.#props = props
    this.#queue = []
    // this.#tables = {}
    this.#tableNames = new Set<string>()
    this.#visitedVariables = []
  }

  #addTableCondition(props: { tableName: TableName }): void {
    const { tableName } = props
    // this.#tables[tableName] = {}
    this.#tableNames.add(tableName)
  }

  #belongsToQueue(props: { variable: VariableCache }): boolean {
    const { variable } = props
    const { tableName } = variable
    const { isODP, nodeUpdates } = this.#props
    const { useOriginalDataPoint } = this.#country.props.forestCharacteristics

    if (isODP && isODPVariable(nodeUpdates.cycle, variable)) {
      if (tableName === TableNames.extentOfForest) return false
      if (tableName === TableNames.forestCharacteristics) return !useOriginalDataPoint
    }

    return true
  }

  async #initQueue(): Promise<void> {
    const { assessment, cycle, countryIso, nodes } = this.#props.nodeUpdates

    this.#country = await CountryRepository.getOne({ assessment, cycle, countryIso })

    nodes.forEach((node) => {
      const { tableName, variableName, colName } = node
      this.#addTableCondition({ tableName })

      const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
      dependants.forEach((variable) => {
        if (this.#belongsToQueue({ variable })) {
          this.#queue.push({ ...variable, colName })
          this.#addTableCondition({ tableName: variable.tableName })
        }
      })

      // self is not visited if it depends on itself
      const selfInQueue = dependants.find(
        (dependant) => dependant.variableName === variableName && dependant.tableName === tableName
      )
      if (!selfInQueue) {
        this.#visitedVariables.push({ variableName, tableName })
      }
    })
  }

  async #createContext(): Promise<Context> {
    const { assessment, cycle, countryIso } = this.#props.nodeUpdates
    const queue = this.#queue
    const visitedVariables = this.#visitedVariables
    const tableNames = Array.from(this.#tableNames)

    const data = await getTableData({ assessment, cycle, countryISOs: [countryIso], tableNames, mergeOdp: true })

    return new Context({ assessment, cycle, countryIso, data, queue, visitedVariables })
  }

  static async newInstance(props: Props): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initQueue()
    return factory.#createContext()
  }
}
