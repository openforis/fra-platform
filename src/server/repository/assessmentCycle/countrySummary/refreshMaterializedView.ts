import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const refreshMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.query(`refresh materialized view concurrently ${schemaCycle}.country_summary;`, [])
}
