import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RowCacheKey } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { Promises } from 'utils/promises'

import { RowRedisRepository } from 'server/cache/repository/row'
import { TableValidationRedisRepository } from 'server/cache/repository/validation/table'

import { BaseContextBuilder } from './baseContextBuilder'
import { Context } from './context'
import { ContextBuilderProps } from './contextBuilderProps'
import { DataContextBuilder } from './dataContextBuilder'

export class ContextFactory extends BaseContextBuilder {
  readonly #dataContextBuilder: DataContextBuilder
  readonly #queue: Array<VariableCache>
  readonly #queuedKeys: Set<string>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<TableName>
  readonly #visitedKeys: Set<string>

  private constructor(props: ContextBuilderProps) {
    super(props)

    this.#dataContextBuilder = new DataContextBuilder(this.props)
    this.#queue = []
    this.#queuedKeys = new Set<string>()
    this.#rowKeys = new Set<RowCacheKey>()
    this.#tableNames = new Set<TableName>()
    this.#visitedKeys = new Set<string>()
  }

  #getVariableKey(variable: VariableCache): string {
    return [variable.tableName, variable.variableName, variable.colName].join(':')
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

  async #addDependantsToQueue(variable: VariableCache): Promise<void> {
    const { assessment, cycle } = this.props
    const dependants = AssessmentMetaCaches.getValidationsDependants({
      assessment,
      cycle,
      colName: variable.colName,
      includeAllColumnsDependants: true,
      tableName: variable.tableName,
      variableName: variable.variableName,
    })

    await Promises.each(dependants, async (dependant) => {
      const candidate: VariableCache = {
        colName: dependant.colName,
        tableName: dependant.tableName,
        variableName: dependant.variableName,
      }

      await this.#addToQueue(candidate)
    })
  }

  async #initQueue(): Promise<void> {
    const { nodeUpdates } = this.props
    const { nodes } = nodeUpdates

    // Traverse the dependant graph starting from the changed source nodes.
    await Promises.each(nodes, async (node) => {
      await this.#addToQueue({
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
      TableValidationRedisRepository.getValidations({ assessment, countryIso, cycle, tableNames }),
    ])
    const { assessments, data } = contextData

    return new Context({
      assessment,
      assessments,
      country,
      cycle,
      data,
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
