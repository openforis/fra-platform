import { Assessment, Cycle, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  table: Table
}

export const refreshMaterilizedFaoEstimateView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, table } = props

  const tableName = table.props.name

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = `${schemaCycle}."${tableName}_faoEstimate"`

  return client.query(`refresh materialized view concurrently ${viewName};`, [])
}
