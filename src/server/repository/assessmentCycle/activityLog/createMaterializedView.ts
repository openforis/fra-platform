import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { MaterializedViews } from 'server/db/materializedViews'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const createMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const mvName = MaterializedViews.getActivityLogCountry(countryIso)

  return client.query(
    `
        create materialized view ${schemaCycle}.${mvName} as
        select * from public.activity_log
        where
          country_iso = $1
          and assessment_uuid = $2
          and cycle_uuid = $3;
    `,
    [countryIso, assessment.uuid, cycle.uuid]
  )
}
