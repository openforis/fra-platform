import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { MaterializedViews } from 'server/db/materializedViews'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const refreshMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const mvName = MaterializedViews.getActivityLogCountry(countryIso)

  return client.query(`refresh materialized view ${schemaCycle}.${mvName};`)
}
