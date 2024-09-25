import * as pgPromise from 'pg-promise'

import { Assessment, Cycle, Row, RowType } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { RowAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: string
  variableName?: string
  includeCols?: boolean
  rowType?: RowType
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<Row>> => {
  const { assessment, cycle, tableName, variableName, includeCols, rowType } = props
  const schema = Schemas.getName(assessment)

  const pgp = pgPromise()
  const queryParams: Record<string, string | boolean> = { tableName, cycleUuid: cycle.uuid }
  const where: Array<string> = []

  if (variableName) {
    queryParams.variableName = variableName
    // eslint-disable-next-line no-template-curly-in-string
    where.push("r.props ->> 'variableName' = ${variableName}")
  }

  // eslint-disable-next-line no-template-curly-in-string
  where.push("t.props ->> 'name' = ${tableName}")
  // eslint-disable-next-line no-template-curly-in-string
  where.push("(r.props -> 'cycles' ? ${cycleUuid} or r.props ->> 'type' = 'header')")

  if (rowType) {
    queryParams.rowType = rowType
    // eslint-disable-next-line no-template-curly-in-string
    where.push("r.props ->> 'type' = ${rowType}")
  }

  const query = pgp.as.format(
    `
    select r.*
           ${includeCols ? `, coalesce(jsonb_agg(c.*) filter (where c.uuid is not null), '[]') as cols` : ''}
    from ${schema}.row r
    left join ${schema}."table" t on r.table_id = t.id
    ${includeCols ? `left join ${schema}.col c on r.id = c.row_id` : ''}
    where ${where.join(' and ')}
    ${includeCols ? `group by r.id, r.uuid, r.props` : ''}
  `,
    queryParams
  )

  return client.map<Row>(query, [], RowAdapter)
}
