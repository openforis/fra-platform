// eslint-disable-next-line max-classes-per-file
import { Promises } from 'utils/promises'

import { Country } from 'meta/area'
import { AssessmentMetaCaches, RowCacheKey, RowCaches, TableNames, VariableCache } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { isODPVariable } from 'server/controller/cycleData/originalDataPoint/getOriginalDataPointVariables'
import { BaseContextBuilder } from 'server/controller/cycleData/updateDependencies/context/baseContextBuilder'
import { ContextBuilderProps } from 'server/controller/cycleData/updateDependencies/context/contextBuilderProps'
import { DataContextBuilder } from 'server/controller/cycleData/updateDependencies/context/dataContextBuilder'
import { BaseProtocol, DB } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RowRedisRepository } from 'server/repository/redis/row'

import { Context } from './context'

export class ContextFactory extends BaseContextBuilder {
  #country: Country
  readonly #queue: Array<VariableCache>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #dataContextBuilder: DataContextBuilder
  readonly #visitedVariables: Array<VariableCache>
  readonly #externalDependants: Array<NodeUpdates>

  private constructor(props: ContextBuilderProps) {
    super(props)
    this.#queue = []
    this.#rowKeys = new Set<RowCacheKey>()
    this.#dataContextBuilder = new DataContextBuilder(props)
    this.#visitedVariables = []
    this.#externalDependants = []
  }

  // check whether a variable must be added to the queue
  #mustAddToQueue(variable: VariableCache): boolean {
    const { tableName } = variable
    const { cycle, isODP } = this.props
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
  async #addToQueue(variable: VariableCache): Promise<void> {
    this.#queue.push(variable)
    await this.#dataContextBuilder.addVariable(variable)
    this.#rowKeys.add(RowCaches.getKey(variable)) // keep track of which rows must be fetched
  }

  #isExternalVariable(variable: VariableCache): boolean {
    const { assessment, cycle } = this.props
    const { assessmentName, cycleName } = variable
    return assessmentName && cycleName && (assessmentName !== assessment.props.name || cycleName !== cycle.name)
  }

  // add node dependants to queue. Returns true if input node is dependant of itself, false otherwise
  async #addDependantsToQueue(variable: VariableCache): Promise<boolean> {
    const { tableName, variableName, colName } = variable
    const { assessment, cycle } = this.props
    const { countryIso } = this.#country

    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    await Promises.each(dependants, async (variable) => {
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
        await this.#addToQueue(dependant)
        await this.#addDependantsToQueue(dependant)
      }
    })

    return Boolean(
      dependants.find((dependant) => dependant.variableName === variableName && dependant.tableName === tableName)
    )
  }

  async #initQueue(client: BaseProtocol): Promise<void> {
    const { assessment, cycle, nodeUpdates, includeSourceNodes } = this.props
    const { countryIso, nodes } = nodeUpdates

    this.#country = await CountryRepository.getOne({ assessment, cycle, countryIso }, client)

    await Promises.each(nodes, async (node) => {
      await this.#dataContextBuilder.addVariable(node)
      if (includeSourceNodes) await this.#addToQueue(node)
      const selfIsDependant = this.#addDependantsToQueue(node)
      // if self is not dependant of itself, mark it as visited
      if (!selfIsDependant && !includeSourceNodes) {
        this.#visitedVariables.push(node)
      }
    })
  }

  async #createContext(): Promise<Context> {
    const { assessment, cycle, nodeUpdates } = this.props
    const { countryIso } = nodeUpdates
    const queue = this.#queue
    const visitedVariables = this.#visitedVariables
    const externalDependants = this.#externalDependants
    const { assessments, data } = await this.#dataContextBuilder.getData()
    const rows = await RowRedisRepository.getRows({ assessment, rowKeys: Array.from(this.#rowKeys) })

    const pr = { assessments, assessment, cycle, countryIso, data, queue, rows, visitedVariables, externalDependants }
    return new Context(pr)
  }

  static async newInstance(props: ContextBuilderProps, client: BaseProtocol = DB): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initQueue(client)
    return factory.#createContext()
  }
}
