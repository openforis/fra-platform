import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, Cycle, Node } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { NodeDb } from './nodeDb'

type Props = {
  assessment: Assessment
  cycle: Cycle
  nodes: Array<NodeDb>
}

export const massiveInsert = (props: Props, client: BaseProtocol = DB): Promise<Array<Node>> => {
  const { assessment, cycle, nodes } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const pgp = pgPromise()
  const columns = ['country_iso', 'row_uuid', 'col_uuid', { name: 'value', cast: 'jsonb' }]
  const table = { table: 'node', schema: schemaCycle }
  const cs = new pgp.helpers.ColumnSet(columns, { table })

  const query = `${pgp.helpers.insert(nodes, cs)} returning *`
  return client.map<Node>(query, [], (res) => Objects.camelize(res))
}
