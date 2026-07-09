import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  countryIso?: CountryIso
  cycle: Cycle
}

export const clearLocations = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const countryIsoCondition = Objects.isEmpty(countryIso) ? '' : 'where country_iso = $(countryIso)'

  return client.query(
    `
      update ${schemaCycle}.link
      set locations = '[]'::jsonb
      ${countryIsoCondition}
    `,
    { countryIso }
  )
}
