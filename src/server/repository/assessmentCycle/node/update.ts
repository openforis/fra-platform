import { Objects } from '@utils/objects'

import { Assessment, Cycle, Node, NodeValue } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  colName: string
  tableName: string
  variableName: string
  value: NodeValue
}

export const update = (props: Props, client: BaseProtocol = DB): Promise<Node> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName, value } = props
  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<Node>(
    `
        update ${schemaCycle}.node n
        set value = $1::jsonb
        from (select n.id
              from ${schemaCycle}.node n
                       left join ${schema}.col c
                                 on n.col_uuid = c.uuid
                       left join ${schema}.row r
                                 on r.id = c.row_id
                       left join ${schema}."table" t
                                 on r.table_id = t.id
              where r.props ->> 'variableName' = $2
                and c.props ->> 'colName' = $3
                and n.country_iso = $4
                and t.props ->> 'name' = $5
             ) n1
        where n.id = n1.id
        returning *
    `,
    [JSON.stringify(value), variableName, colName, countryIso, tableName],
    Objects.camelize
  )
}
