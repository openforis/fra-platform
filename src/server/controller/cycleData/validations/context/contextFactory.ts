import { ColName } from 'meta/assessment/col'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RowCache, RowCacheKey } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { RowRedisRepository } from 'server/cache/repository/row'
import { ValidationRedisRepository } from 'server/cache/repository/validation'

import { BaseContextBuilder } from './baseContextBuilder'
import { Context } from './context'
import { ContextBuilderProps } from './contextBuilderProps'
import { DataContextBuilder } from './dataContextBuilder'

export class ContextFactory extends BaseContextBuilder {
  readonly #dataContextBuilder: DataContextBuilder
  readonly #externalNodeUpdatesByCycle: Map<string, NodeUpdates>
  readonly #queue: Array<VariableCache>
  readonly #queuedKeys: Set<string>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<TableName>
  readonly #visitedKeys: Set<string>

  private constructor(props: ContextBuilderProps) {
    super(props)

    this.#dataContextBuilder = new DataContextBuilder(this.props)
    this.#externalNodeUpdatesByCycle = new Map<string, NodeUpdates>()
    this.#queue = []
    this.#queuedKeys = new Set<string>()
    this.#rowKeys = new Set<RowCacheKey>()
    this.#tableNames = new Set<TableName>()
    this.#visitedKeys = new Set<string>()
  }

  #getVariableKey(variable: VariableCache): string {
    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    return [assessmentName, cycleName, variable.tableName, variable.variableName, variable.colName].join(':')
  }

  #getNodeUpdateKey(node: NodeUpdate, assessmentName: string, cycleName: string): string {
    return [assessmentName, cycleName, node.tableName, node.variableName, node.colName].join(':')
  }

  #isCurrentTarget(variable: VariableCache): boolean {
    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    return assessmentName === this.props.assessment.props.name && cycleName === this.props.cycle.name
  }

  async #getRow(variable: VariableCache): Promise<RowCache | undefined> {
    const rowKey = RowCaches.getKey(variable)

    const rows = await RowRedisRepository.getRows({ assessment: this.props.assessment, rowKeys: [rowKey] })

    return rows[rowKey]
  }

  async #expandVariable(variable: VariableCache): Promise<Array<VariableCache>> {
    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    if (!Objects.isEmpty(variable.colName)) {
      return [{ ...variable, assessmentName, cycleName, colName: variable.colName }]
    }

    const row = await this.#getRow(variable)
    const colNames =
      row?.cols?.reduce<Array<ColName>>((acc, col) => {
        const colName = col.props.colName as ColName | undefined

        if (Objects.isEmpty(colName)) {
          return acc
        }

        acc.push(colName)

        return acc
      }, []) ?? []

    return colNames.map((colName) => ({
      ...variable,
      assessmentName,
      cycleName,
      colName,
    }))
  }

  async #addToQueue(variable: VariableCache): Promise<void> {
    const variableKey = this.#getVariableKey(variable)

    // Skip variables that were already processed or are already scheduled.
    if (this.#queuedKeys.has(variableKey) || this.#visitedKeys.has(variableKey)) {
      return
    }

    // Keep track of affected local tables and preload their validation dependencies.
    this.#queue.push(variable)
    this.#queuedKeys.add(variableKey)
    this.#tableNames.add(variable.tableName)

    await this.#dataContextBuilder.addVariable(variable)
    this.#rowKeys.add(RowCaches.getKey(variable))
  }

  #addExternalNodeUpdate(variable: VariableCache): void {
    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name
    const key = `${assessmentName}:${cycleName}`
    const existing = this.#externalNodeUpdatesByCycle.get(key)
    const externalNode: NodeUpdate = {
      colName: variable.colName,
      tableName: variable.tableName,
      value: { raw: undefined },
      variableName: variable.variableName,
    }
    const externalNodeKey = this.#getNodeUpdateKey(externalNode, assessmentName, cycleName)

    if (!existing) {
      this.#externalNodeUpdatesByCycle.set(key, {
        assessmentName,
        countryIso: this.props.country.countryIso,
        cycleName,
        nodes: [externalNode],
      })
      return
    }

    if (!existing.nodes.find((node) => this.#getNodeUpdateKey(node, assessmentName, cycleName) === externalNodeKey)) {
      existing.nodes.push(externalNode)
    }
  }

  async #addDependantsToQueue(variable: VariableCache): Promise<void> {
    const { assessment, cycle } = this.props
    const dependants = AssessmentMetaCaches.getValidationsDependants({
      assessment,
      cycle,
      tableName: variable.tableName,
      variableName: variable.variableName,
    })

    await Promises.each(dependants, async (dependant) => {
      const candidates = await this.#expandVariable({
        assessmentName: dependant.assessmentName ?? assessment.props.name,
        cycleName: dependant.cycleName ?? cycle.name,
        colName: dependant.colName,
        tableName: dependant.tableName,
        variableName: dependant.variableName,
      })

      await Promises.each(candidates, async (candidate) => {
        if (!this.#isCurrentTarget(candidate)) {
          // External validation dependants are rescheduled through updateDependencies in the target cycle.
          this.#addExternalNodeUpdate(candidate)
          return
        }

        await this.#addToQueue(candidate)
      })
    })
  }

  async #initQueue(): Promise<void> {
    const { nodeUpdates } = this.props
    const { assessmentName, cycleName, nodes } = nodeUpdates

    // Traverse the dependant graph starting from the changed source nodes.
    await Promises.each(nodes, async (node) => {
      await this.#addToQueue({
        assessmentName,
        cycleName,
        colName: node.colName,
        tableName: node.tableName,
        variableName: node.variableName,
      })
    })

    await Promises.each(this.#queue, async (variable) => {
      const variableKey = this.#getVariableKey(variable)

      if (this.#visitedKeys.has(variableKey)) {
        return
      }

      this.#visitedKeys.add(variableKey)
      await this.#addDependantsToQueue(variable)
    })
  }

  async #createContext(): Promise<Context> {
    const { assessment, country, cycle } = this.props
    const { countryIso } = country
    const tableNames = Array.from(this.#tableNames)

    const [contextData, rows, tableValidations] = await Promise.all([
      this.#dataContextBuilder.getData(),
      RowRedisRepository.getRows({ assessment, rowKeys: Array.from(this.#rowKeys) }),
      ValidationRedisRepository.getTableValidations({ assessment, countryIso, cycle, tableNames }),
    ])
    const { assessments, data } = contextData

    return new Context({
      assessment,
      assessments,
      country,
      cycle,
      data,
      externalNodeUpdates: Array.from(this.#externalNodeUpdatesByCycle.values()),
      queue: [...this.#queue],
      rows,
      tableNames,
      tableValidations,
    })
  }

  static async newInstance(props: ContextBuilderProps): Promise<Context> {
    const factory = new ContextFactory(props)
    await factory.#initQueue()

    return factory.#createContext()
  }
}
