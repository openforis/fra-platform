import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const dropMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.query(`drop materialized view if exists ${schemaCycle}.country_summary`)
}
