import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RowCacheKey } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { Arrays } from 'utils/arrays'
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
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<TableName>

  private constructor(props: ContextBuilderProps) {
    super(props)

    this.#dataContextBuilder = new DataContextBuilder(this.props)
    this.#queue = []
    this.#rowKeys = new Set<RowCacheKey>()
    this.#tableNames = new Set<TableName>()
  }

  #getVariableKey(variable: VariableCache): string {
    return [variable.tableName, variable.variableName, variable.colName].join(':')
  }

  #isInQueue(variable: VariableCache): boolean {
    const variableKey = this.#getVariableKey(variable)
    return this.#queue.some((queued) => this.#getVariableKey(queued) === variableKey)
  }

  #addToQueue(variable: VariableCache): void {
    if (this.#isInQueue(variable)) {
      return
    }

    this.#queue.push(variable)
  }

  #addDependantsToQueue(variable: VariableCache): void {
    const { assessment, cycle } = this.props
    const dependants = AssessmentMetaCaches.getValidationsDependants({
      assessment,
      cycle,
      colName: variable.colName,
      includeAllColumnsDependants: true,
      tableName: variable.tableName,
      variableName: variable.variableName,
    })

    dependants.forEach((dependant) => {
      this.#addToQueue({
        colName: dependant.colName,
        tableName: dependant.tableName,
        variableName: dependant.variableName,
      })
    })
  }

  async #initQueue(): Promise<void> {
    const { nodeUpdates } = this.props

    // Seed the queue with the changed source nodes.
    const sourceVariables = nodeUpdates.nodes.map<VariableCache>((node) => ({
      colName: node.colName,
      tableName: node.tableName,
      variableName: node.variableName,
    }))
    this.#queue.push(...Arrays.uniqueBy(sourceVariables, (variable) => this.#getVariableKey(variable)))

    // Add the dependants of each queued variable. The queue grows while we iterate it,
    // so dependants of dependants are included as well.
    await Promises.each(this.#queue, async (variable) => {
      this.#tableNames.add(variable.tableName)
      await this.#dataContextBuilder.addVariable(variable)
      this.#rowKeys.add(RowCaches.getKey(variable))

      this.#addDependantsToQueue(variable)
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
