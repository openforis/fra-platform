import { Assessment, Cycle, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { getFaoEstimateViewName } from 'server/repository/assessmentCycle/data/getFaoEstimateViewName'

type Props = {
  assessment: Assessment
  cycle: Cycle
  table: Table
}

export const refreshMaterilizedFaoEstimateView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, table } = props

  const tableName = table.props.name

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = getFaoEstimateViewName(schemaCycle, tableName)

  return client.query(`refresh materialized view concurrently ${viewName};`, [])
}
