import { Objects } from 'utils/objects'

import { Assessment, Cycle, Node } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: string
  colName: string
  tableName: string
  variableName: string
}

export const getOneOrNone = (props: Props, client: BaseProtocol = DB): Promise<Node | null> => {
  const { assessment, cycle, countryIso, colName, tableName, variableName } = props
  const schema = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone(
    `
        select n.*
        from ${schemaCycle}.node n
                 left join ${schema}.row r
                           on n.row_uuid = r.uuid
                 left join ${schema}.col c
                           on n.col_uuid = c.uuid
                 left join ${schema}."table" t
                           on r.table_id = t.id
        where r.props ->> 'variableName' = $1
          and c.props ->> 'colName' = $2
          and n.country_iso = $3
          and t.props ->> 'name' = $4  
    `,
    [variableName, colName, countryIso, tableName],
    Objects.camelize
  )
}
