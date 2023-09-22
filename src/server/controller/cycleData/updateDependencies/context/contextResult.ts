import { Objects } from 'utils/objects'

import { Col, Row } from 'meta/assessment'
import { NodeUpdate, NodeUpdates, RecordAssessmentData } from 'meta/data'

import { NodeDb } from 'server/repository/assessmentCycle/node'

import { Context } from './context'

export class ContextResult {
  readonly #context: Context
  readonly #colUuids: Array<string>
  readonly #nodes: Array<NodeUpdate>
  readonly #nodesDb: Array<NodeDb>
  readonly #tableNames: Set<string>

  constructor(props: { context: Context }) {
    const { context } = props

    this.#context = context
    this.#colUuids = []
    this.#nodes = []
    this.#nodesDb = []
    this.#tableNames = new Set()
  }

  get colUuids(): Array<string> {
    return this.#colUuids
  }

  get data(): RecordAssessmentData {
    return this.#context.data
  }

  get nodesDb(): Array<NodeDb> {
    return this.#nodesDb
  }

  get nodeUpdates(): NodeUpdates {
    const { assessment, cycle, countryIso } = this.#context
    return { assessment, cycle, countryIso, nodes: this.#nodes }
  }

  get tableNames(): Array<string> {
    return Array.from(this.#tableNames)
  }

  push(props: { col: Col; node: NodeUpdate; row: Row }): void {
    const { col, row, node } = props
    const { tableName, colName, variableName, value } = node

    const { assessment, cycle, countryIso } = this.#context
    const assessmentName = assessment.props.name
    const cycleName = cycle.name

    // 1. update context data
    const path = [assessmentName, cycleName, countryIso, tableName, colName, variableName]
    Objects.setInPath({ obj: this.#context.data, path, value })

    // 2. keep track of updated nodes
    this.#nodes.push(node)

    // 3. keep track of updated tables
    this.#tableNames.add(tableName)

    // 4. push to nodes db for massive insert
    const nodeDb: NodeDb = { country_iso: countryIso, col_uuid: col.uuid, row_uuid: row.uuid, value }
    this.nodesDb.push(nodeDb)

    // 5. keep track of updated columns
    this.colUuids.push(col.uuid)
  }
}
