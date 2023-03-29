import { Assessment, Row } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'
import { RowAdapter } from '@server/repository/adapter/row'

type Props = {
  assessment: Assessment
  tableName: string
  variableNames?: string[]
  includeCols?: boolean
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<Row>> => {
  const { assessment, tableName, variableNames = [], includeCols } = props
  const schema = Schemas.getName(assessment)

  let withVariableNames = ''
  if (variableNames.length > 0) {
    withVariableNames = `and r.props ->> 'variableName' in $($1:csv)`
  }

  return client.map<Row>(
    `
        select r.*
               ${includeCols ? `, coalesce(jsonb_agg(c.*) filter (where c.uuid is not null), '[]')     as cols` : ''}
        from ${schema}.row r
                left join ${schema}."table" t on r.table_id = t.id
                ${includeCols ? `left join ${schema}.col c on r.id = c.row_id` : ''}
        where t.props ->> 'name' = $2 ${withVariableNames}
        ${includeCols ? `group by r.id, r.uuid, r.props` : ''}
    `,
    [variableNames, tableName],
    RowAdapter
  )
}
