import pgPromise from 'pg-promise'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Node } from 'meta/assessment/node'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { NodeDb } from 'server/db/repository/assessmentCycle/node/nodeDb'
import { Schemas } from 'server/db/schemas'

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

  const query = `${pgp.helpers.insert(
    nodes,
    cs
  )} on conflict ("country_iso", "row_uuid", "col_uuid") do update set "value" = excluded."value" returning *`
  return client.map<Node>(query, [], (res) => Objects.camelize(res))
}
