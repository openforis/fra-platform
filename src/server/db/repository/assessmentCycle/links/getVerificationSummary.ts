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

type Returned = {
  invalidCount?: number
  invalidUnapprovedCount?: number
}

export const getVerificationSummary = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countryIso, cycle } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const params = { countryIso }
  const whereConditions = [
    `(props->>'deleted')::boolean is distinct from true`,
    countryIso && `country_iso = $(countryIso)`,
  ].filter(Boolean)

  return client.one(
    `
      select
        (count(*) filter (where (visits -> (jsonb_array_length(visits) - 1) ->> 'code') <> 'success'))::int as invalid_count,
        (count(*) filter (
          where (visits -> (jsonb_array_length(visits) - 1) ->> 'code') <> 'success'
            and (props ->> 'approved')::boolean is distinct from true
        ))::int as invalid_unapproved_count
      from ${schemaCycle}.link
      where ${whereConditions.join(' and ')}
    `,
    params,
    (row) => Objects.camelize(row)
  )
}
