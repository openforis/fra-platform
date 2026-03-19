import { RecordAssessments } from 'meta/assessment/assessment'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { TableName } from 'meta/assessment/table'
import { NodeUpdate, NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Promises } from 'utils/promises'

import { BaseContextBuilder } from './baseContextBuilder'
import { Context } from './context'
import { ContextBuilderProps } from './contextBuilderProps'
import { DataContextBuilder } from './dataContextBuilder'

type Props = Pick<ContextBuilderProps, 'assessment' | 'cycle'> & {
  nodeUpdates: NodeUpdates
}

type Returned = {
  externalNodeUpdates: Array<NodeUpdates>
  tableNames: Array<TableName>
}

export class ContextFactory extends BaseContextBuilder {
  readonly #dataContextBuilder?: DataContextBuilder
  readonly #externalNodeUpdatesByCycle: Map<string, NodeUpdates>
  readonly #nodeUpdates: NodeUpdates
  readonly #queue: Array<VariableCache>
  readonly #tableNames: Set<TableName>
  readonly #visitedVariables: Set<string>

  private constructor(props: Props, withDataContext: boolean) {
    super({ assessment: props.assessment, countryIso: props.nodeUpdates.countryIso, cycle: props.cycle })

    const { assessmentName, cycleName, nodes } = props.nodeUpdates

    if (withDataContext) {
      this.#dataContextBuilder = new DataContextBuilder(this.props)
    }

    this.#externalNodeUpdatesByCycle = new Map<string, NodeUpdates>()
    this.#nodeUpdates = props.nodeUpdates
    this.#queue = nodes.map((node) => ({
      assessmentName,
      cycleName,
      colName: node.colName,
      tableName: node.tableName,
      variableName: node.variableName,
    }))
    this.#tableNames = new Set<TableName>()
    this.#visitedVariables = new Set<string>()
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

  #isQueued(variable: VariableCache): boolean {
    const variableKey = this.#getVariableKey(variable)

    return this.#queue.some((queuedVariable) => this.#getVariableKey(queuedVariable) === variableKey)
  }

  #addToQueue(variable: VariableCache): void {
    const variableKey = this.#getVariableKey(variable)

    // Skip variables that were already processed or are already scheduled
    if (!this.#visitedVariables.has(variableKey) && !this.#isQueued(variable)) {
      this.#queue.push(variable)
    }
  }

  async #addTable(tableName: TableName): Promise<void> {
    if (this.#tableNames.has(tableName)) return

    // Keep track of affected local tables and optionally preload their validation deps
    this.#tableNames.add(tableName)

    if (this.#dataContextBuilder) {
      await this.#dataContextBuilder.addTable(tableName)
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
      // External validation dependants are rescheduled through updateDependencies in the target cycle
      this.#externalNodeUpdatesByCycle.set(key, {
        assessmentName,
        countryIso: this.#nodeUpdates.countryIso,
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
    const dependants = [
      ...AssessmentMetaCaches.getCalculationsDependants({
        assessment,
        cycle,
        tableName: variable.tableName,
        variableName: variable.variableName,
      }),
      ...AssessmentMetaCaches.getValidationsDependants({
        assessment,
        cycle,
        tableName: variable.tableName,
        variableName: variable.variableName,
      }),
    ]

    await Promises.each(dependants, async (dependant) => {
      const candidate: VariableCache = {
        assessmentName: dependant.assessmentName ?? assessment.props.name,
        cycleName: dependant.cycleName ?? cycle.name,
        colName: dependant.colName ?? variable.colName,
        tableName: dependant.tableName,
        variableName: dependant.variableName,
      }

      if (!this.#isCurrentTarget(candidate)) {
        this.#addExternalNodeUpdate(candidate)
        return
      }

      this.#addToQueue(candidate)
    })
  }

  async #initQueue(): Promise<void> {
    // Traverse the dependant graph starting from the changed source nodes
    await Promises.each(this.#queue, async (variable) => {
      const variableKey = this.#getVariableKey(variable)
      if (this.#visitedVariables.has(variableKey)) {
        return
      }

      this.#visitedVariables.add(variableKey)
      await this.#addTable(variable.tableName)
      await this.#addDependantsToQueue(variable)
    })
  }

  #getTargets(): Returned {
    return {
      externalNodeUpdates: Array.from(this.#externalNodeUpdatesByCycle.values()),
      tableNames: Array.from(this.#tableNames),
    }
  }

  async #getDataContext(): Promise<{ assessments: RecordAssessments; data: RecordAssessmentData }> {
    const { assessment } = this.props
    if (this.#dataContextBuilder) {
      return this.#dataContextBuilder.getData()
    }

    return {
      assessments: { [assessment.props.name]: assessment },
      data: {} as RecordAssessmentData,
    }
  }

  async #createContext(): Promise<Context> {
    const { assessment, countryIso, cycle } = this.props
    const { assessments, data } = await this.#getDataContext()

    // collect() only needs targets, while newInstance() also materializes the fetched validation data
    return new Context({
      assessment,
      assessments,
      countryIso,
      cycle,
      data,
      externalNodeUpdates: Array.from(this.#externalNodeUpdatesByCycle.values()),
      tableNames: Array.from(this.#tableNames),
    })
  }

  static async collect(props: Props): Promise<Returned> {
    const factory = new ContextFactory(props, false)
    await factory.#initQueue()

    return factory.#getTargets()
  }

  static async newInstance(props: Props): Promise<Context> {
    const factory = new ContextFactory(props, true)
    await factory.#initQueue()

    return factory.#createContext()
  }
}
