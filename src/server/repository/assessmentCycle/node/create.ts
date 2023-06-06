import { Objects } from 'utils/objects'

import { Assessment, Cycle, Node, NodeValue } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
  const { assessment, cycle, countryIso, tableName, variableName, colName, value } = props
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
                           on r.table_id = t.id
        where r.props ->> 'variableName' = $3
          and c.props ->> 'colName' = $4
          and t.props ->> 'name' = $5
        returning *
    `,
    [countryIso, JSON.stringify(value), variableName, colName, tableName],
    Objects.camelize
  )
}
