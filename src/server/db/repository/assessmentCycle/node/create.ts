import { Objects } from 'utils/objects'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Node, NodeValue } from 'meta/assessment/node'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  colName: string
  tableName: string
  variableName: string
  value: NodeValue
}

export const create = (props: Props, client: BaseProtocol = DB): Promise<Node> => {
  const { assessment, colName, countryIso, cycle, tableName, value, variableName } = props
  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<Node>(
    `
        insert into ${schemaCycle}.node (country_iso, row_uuid, col_uuid, value)
        select $1 as country_iso, r.uuid as row_uuid, c.uuid as col_uuid, $2::jsonb
        from ${schema}.col c
                 left join ${schema}.row r
                           on r.id = c.row_id
                 left join ${schema}."table" t
                           on r.table_uuid = t.uuid
        where r.props ->> 'variableName' = $3
          and c.props ->> 'colName' = $4
          and t.props ->> 'name' = $5
        returning *
    `,
    [countryIso, JSON.stringify(value), variableName, colName, tableName],
    Objects.camelize
  )
}
