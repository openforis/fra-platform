import { Assessment } from 'meta/assessment/assessment'
import { Row } from 'meta/assessment/row'

import { BaseProtocol, DB } from 'server/db/db'
import { RowAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  tableName: string
  variableName: string
  includeCols?: boolean
}

export const getOne = (props: Props, client: BaseProtocol = DB): Promise<Row> => {
  const { assessment, includeCols, tableName, variableName } = props
  const schema = Schemas.getName(assessment)

  return client.one<Row>(
    `
        select r.*
               ${includeCols ? `, coalesce(jsonb_agg(c.*)    filter (where c.uuid is not null), '[]')     as cols` : ''}
        from ${schema}.row r
                left join ${schema}."table" t on r.table_uuid = t.uuid
                ${includeCols ? `left join ${schema}.col c on r.id = c.row_id` : ''}
        where r.props ->> 'variableName' = $1
            and t.props ->> 'name' = $2
        ${includeCols ? `group by r.id, r.uuid, r.props` : ''}
    `,
    [variableName, tableName],
    RowAdapter
  )
}
