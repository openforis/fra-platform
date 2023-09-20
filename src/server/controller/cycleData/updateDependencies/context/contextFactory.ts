import { Country } from 'meta/area'
import { TableName, VariableCache } from 'meta/assessment'
import { NodeUpdates, RecordAssessmentData } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { isODPCell } from 'server/controller/cycleData/updateDependencies/context/isODPCell'
import { getDependants } from 'server/controller/cycleData/updateDependencies/utils/getDependants'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/repository/redis/data'

import { Context } from './context'

type Props = {
  isODP: boolean
  nodeUpdates: NodeUpdates
}

export class ContextFactory {
  #country: Country
  #data: RecordAssessmentData
  #odpYears: Array<string>
  readonly #props: Props
  readonly #queue: Array<VariableCache>
  readonly #tableNames: Set<string>
  // TODO: use this object when refactoring getTableData tables condition input prop (and uncomment related code below)
  // readonly #tables: TablesCondition

  private constructor(props: Props) {
    this.#props = props
    this.#queue = []
    // this.#tables = {}
    this.#tableNames = new Set<string>()
  }

  async #initCountryAndOdpYears(): Promise<void> {
    const { nodeUpdates } = this.#props
    const { assessment, cycle, countryIso } = nodeUpdates

    const [country, odpYears] = await Promise.all([
      CountryRepository.getOne({ assessment, cycle, countryIso }),
      DataRedisRepository.getODPYears({ assessment, cycle, countryIso }),
    ])
    this.#country = country
    this.#odpYears = odpYears
  }

  #addTableCondition(props: { tableName: TableName }): void {
    const { tableName } = props
    // if (!this.#tables[tableName]) {
    //   this.#tables[tableName] = {}
    // }
    this.#tableNames.add(tableName)
  }

  #initQueue(): void {
    const { isODP, nodeUpdates } = this.#props
    const { assessment, cycle, nodes } = nodeUpdates

    nodes.forEach((node) => {
      const { tableName, variableName, colName } = node
      this.#addTableCondition({ tableName })

      const odpCell = isODPCell({ country: this.#country, tableName, colName, odpYears: this.#odpYears })
      const dependants = getDependants({ assessment, cycle, tableName, variableName, isODP, odpCell })
      dependants.forEach((dependant) => {
        this.#queue.push({ ...dependant, colName })
        this.#addTableCondition({ tableName: dependant.tableName })
      })
    })
  }

  async #initData(): Promise<void> {
    // const { #tables: tables } = this
    const { nodeUpdates } = this.#props
    const { assessment, cycle, countryIso } = nodeUpdates

    const countryISOs = [countryIso]
    const tableNames = Array.from(this.#tableNames)
    // TODO: for now consider always merging ODP
    const props = { assessment, cycle, countryISOs, tableNames, mergeOdp: true }
    this.#data = await getTableData(props)
  }

  #createContext(): Context {
    const { nodeUpdates } = this.#props
    const { assessment, cycle, countryIso } = nodeUpdates
    return new Context({ assessment, cycle, countryIso, data: this.#data, queue: this.#queue })
  }

  static async newInstance(props: Props): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initCountryAndOdpYears()
    factory.#initQueue()
    await factory.#initData()
    return factory.#createContext()
  }
}
