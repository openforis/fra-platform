import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  colName: string
  tableName: string
  variableName: string
}

export const remove = (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, tableName, variableName, colName } = props
  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.query(
    `
        delete
        from ${schemaCycle}.node
        where id = (select n.id
                    from ${schemaCycle}.node n
                             left join ${schema}.col c
                                       on n.col_uuid = c.uuid
                             left join ${schema}.row r
                                       on r.id = c.row_id
                             left join ${schema}."table" t
                                       on r.table_id = t.id
                    where r.props ->> 'variableName' = $1
                      and c.props ->> 'colName' = $2
                      and n.country_iso = $3
                      and t.props ->> 'name' = $4)
    `,
    [variableName, colName, countryIso, tableName]
  )
}
