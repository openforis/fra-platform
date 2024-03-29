import { Objects } from 'utils/objects'

import { Assessment, Col, Cycle, NodeValue, RowCache, TableName } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

import { NodeDb } from 'server/repository/assessmentCycle/node'

import { Context } from './context'

export class ContextResult {
  readonly #context: Context
  readonly #nodes: Record<TableName, Array<NodeUpdate>>
  readonly #nodesDb: Array<NodeDb>
  readonly #rowsByColUuid: Record<string, RowCache>

  constructor(props: { context: Context }) {
    const { context } = props

    this.#context = context
    this.#nodes = {}
    this.#nodesDb = []
    this.#rowsByColUuid = {}
  }

  get assessment(): Assessment {
    return this.#context.assessment
  }

  get cycle(): Cycle {
    return this.#context.cycle
  }

  get nodes(): Record<TableName, Array<NodeUpdate>> {
    return this.#nodes
  }

  get nodesDb(): Array<NodeDb> {
    return this.#nodesDb
  }

  get nodeUpdates(): NodeUpdates {
    const { assessment, cycle, countryIso } = this.#context
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const nodes = Object.values(this.#nodes).flatMap((nodes) => nodes)
    return { assessmentName, cycleName, countryIso, nodes }
  }

  get rowsByColUuid(): Record<string, RowCache> {
    return this.#rowsByColUuid
  }

  push(props: { row: RowCache; col: Col; value: NodeValue }): void {
    const { row, col, value } = props

    if (!this.rowsByColUuid[col.uuid]) {
      const { assessment, cycle, countryIso } = this.#context
      const assessmentName = assessment.props.name
      const cycleName = cycle.name
      const { tableName } = row
      const { variableName } = row.props
      const { colName } = col.props

      // 1. update context data
      const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
      Objects.setInPath({ obj: this.#context.data, path, value })

      // 2. keep track of updated nodes
      if (!this.#nodes[tableName]) {
        this.#nodes[tableName] = []
      }
      this.#nodes[tableName].push({ tableName, variableName, colName, value })

      // 3. push to nodes db for massive insert
      const nodeDb: NodeDb = { country_iso: countryIso, col_uuid: col.uuid, row_uuid: row.uuid, value }
      this.nodesDb.push(nodeDb)

      // 4. keep track of updated columns and rows
      this.rowsByColUuid[col.uuid] = row
    }
  }
}
