import { Country } from 'meta/area'
import { AssessmentMetaCaches, RowCacheKey, RowCaches, TableNames, VariableCache } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { getTableData } from 'server/controller/cycleData/getTableData'
import { isODPVariable } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { UpdateDependenciesProps } from 'server/controller/cycleData/updateDependencies/props'
import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RowRedisRepository } from 'server/repository/redis/row'

import { Context } from './context'

type Props = Omit<UpdateDependenciesProps, 'user'>

export class ContextFactory {
  #country: Country
  readonly #props: Props
  readonly #queue: Array<VariableCache>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<string>
  readonly #visitedVariables: Array<VariableCache>
  readonly #externalDependants: Array<NodeUpdates>
  // TODO: use this object when refactoring getTableData tables condition input prop (and uncomment related code below)
  // readonly #tables: TablesCondition

  private constructor(props: Props) {
    this.#props = props
    this.#queue = []
    this.#rowKeys = new Set<RowCacheKey>()
    // this.#tables = {}
    this.#tableNames = new Set<string>()
    this.#visitedVariables = []
    this.#externalDependants = []
  }

  // keep track of which table data to fetch
  #addTableCondition(variable: VariableCache): void {
    const { tableName, variableName } = variable
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

  #isExternalVariable(variable: VariableCache): boolean {
    const { assessment, cycle } = this.#props
    const { assessmentName, cycleName } = variable
    return assessmentName && cycleName && (assessmentName !== assessment.props.name || cycleName !== cycle.name)
  }

  // add node dependants to queue. Returns true if input node is dependant of itself, false otherwise
  #addDependantsToQueue(variable: VariableCache): boolean {
    const { tableName, variableName, colName } = variable
    const { assessment, cycle } = this.#props
    const { countryIso } = this.#country

    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    dependants.forEach((variable) => {
      const externalVariable = this.#isExternalVariable(variable)

      // external variable
      if (externalVariable) {
        let externalNodeUpdates = this.#externalDependants.find(
          (n) => n.assessmentName === variable.assessmentName && n.cycleName === variable.cycleName
        )
        const externalNodeNodeUpdate: NodeUpdate = { ...variable, colName, value: { raw: undefined } }
        if (externalNodeUpdates) {
          externalNodeUpdates.nodes.push(externalNodeNodeUpdate)
        } else {
          externalNodeUpdates = {
            assessmentName: variable.assessmentName,
            cycleName: variable.cycleName,
            countryIso,
            nodes: [externalNodeNodeUpdate],
          }
          this.#externalDependants.push(externalNodeUpdates)
        }
      }

      // internal variable
      const dependant = { tableName: variable.tableName, variableName: variable.variableName, colName }
      if (!externalVariable && !this.#isInQueue(dependant) && this.#mustAddToQueue(dependant)) {
        this.#addToQueue(dependant)
        this.#addDependantsToQueue(dependant)
      }
    })

    return Boolean(
      dependants.find((dependant) => dependant.variableName === variableName && dependant.tableName === tableName)
    )
  }

  async #initQueue(client: BaseProtocol): Promise<void> {
    const { assessment, cycle, nodeUpdates, includeSourceNodes } = this.#props
    const { countryIso, nodes } = nodeUpdates

    this.#country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)

    nodes.forEach((node) => {
      this.#addTableCondition(node)
      if (includeSourceNodes) this.#addToQueue(node)
      const selfIsDependant = this.#addDependantsToQueue(node)
      // if self is not dependant of itself, mark it as visited
      if (!selfIsDependant && !includeSourceNodes) {
        this.#visitedVariables.push(node)
      }
    })
  }

  async #createContext(): Promise<Context> {
    const { assessment, cycle, nodeUpdates } = this.#props
    const { countryIso } = nodeUpdates
    const queue = this.#queue
    const visitedVariables = this.#visitedVariables
    const tableNames = Array.from(this.#tableNames)
    const externalDependants = this.#externalDependants
    const data = await getTableData({ assessment, cycle, countryISOs: [countryIso], tableNames, mergeOdp: true })
    const rows = await RowRedisRepository.getRows({ assessment, rowKeys: Array.from(this.#rowKeys) })

    return new Context({ assessment, cycle, countryIso, data, queue, rows, visitedVariables, externalDependants })
  }

  static async newInstance(props: Props, client: BaseProtocol = DB): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initQueue(client)
    return factory.#createContext()
  }
}
