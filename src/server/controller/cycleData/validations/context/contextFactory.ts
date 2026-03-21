import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { RowCacheKey } from 'meta/assessment/rowCache'
import { RowCaches } from 'meta/assessment/rowCaches'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { RowRedisRepository } from 'server/cache/repository/row'

import { BaseContextBuilder } from './baseContextBuilder'
import { Context } from './context'
import { ContextBuilderProps } from './contextBuilderProps'
import { DataContextBuilder } from './dataContextBuilder'

type Returned = {
  externalNodeUpdates: Array<NodeUpdates>
  tableNames: Array<TableName>
}

export class ContextFactory extends BaseContextBuilder {
  readonly #dataContextBuilder?: DataContextBuilder
  readonly #externalNodeUpdatesByCycle: Map<string, NodeUpdates>
  readonly #queue: Array<VariableCache>
  readonly #queuedKeys: Set<string>
  readonly #rowKeys: Set<RowCacheKey>
  readonly #tableNames: Set<TableName>
  readonly #visitedKeys: Set<string>

  private constructor(props: ContextBuilderProps, withDataContext: boolean) {
    super(props)

    if (withDataContext) {
      this.#dataContextBuilder = new DataContextBuilder(this.props)
    }

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

  async #addToQueue(variable: VariableCache): Promise<void> {
    const variableKey = this.#getVariableKey(variable)

    // Skip variables that were already processed or are already scheduled.
    if (this.#queuedKeys.has(variableKey) || this.#visitedKeys.has(variableKey)) {
      return
    }

    // Keep track of affected local tables and optionally preload their validation dependencies.
    this.#queue.push(variable)
    this.#queuedKeys.add(variableKey)
    this.#tableNames.add(variable.tableName)

    if (this.#dataContextBuilder) {
      await this.#dataContextBuilder.addVariable(variable)
      this.#rowKeys.add(RowCaches.getKey(variable))
    }
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
      const candidate: VariableCache = {
        assessmentName: dependant.assessmentName ?? assessment.props.name,
        cycleName: dependant.cycleName ?? cycle.name,
        colName: dependant.colName ?? variable.colName,
        tableName: dependant.tableName,
        variableName: dependant.variableName,
      }

      if (Objects.isEmpty(candidate.colName)) {
        return
      }

      if (!this.#isCurrentTarget(candidate)) {
        // External validation dependants are rescheduled through updateDependencies in the target cycle.
        this.#addExternalNodeUpdate(candidate)
        return
      }

      await this.#addToQueue(candidate)
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

  #getTargets(): Returned {
    return {
      externalNodeUpdates: Array.from(this.#externalNodeUpdatesByCycle.values()),
      tableNames: Array.from(this.#tableNames),
    }
  }

  async #getDataContext(): Promise<{ assessments: Context['assessments']; data: RecordAssessmentData }> {
    const { assessment } = this.props

    if (this.#dataContextBuilder) {
      return this.#dataContextBuilder.getData()
    }

    return { assessments: { [assessment.props.name]: assessment }, data: {} as RecordAssessmentData }
  }

  async #createContext(): Promise<Context> {
    const { assessment, country, cycle } = this.props
    const { assessments, data } = await this.#getDataContext()
    const rows = await RowRedisRepository.getRows({ assessment, rowKeys: Array.from(this.#rowKeys) })

    return new Context({
      assessment,
      assessments,
      country,
      cycle,
      data,
      externalNodeUpdates: Array.from(this.#externalNodeUpdatesByCycle.values()),
      queue: [...this.#queue],
      rows,
      tableNames: Array.from(this.#tableNames),
    })
  }

  static async collect(props: ContextBuilderProps): Promise<Returned> {
    // collect() only needs targets, while newInstance() also materializes the fetched validation data.
    const factory = new ContextFactory(props, false)
    await factory.#initQueue()

    return factory.#getTargets()
  }

  static async newInstance(props: ContextBuilderProps): Promise<Context> {
    const factory = new ContextFactory(props, true)
    await factory.#initQueue()

    return factory.#createContext()
  }
}
