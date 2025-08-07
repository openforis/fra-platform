import { Objects } from 'utils/objects'

import { CountryIso, CountrySummary } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { SQLs } from 'server/db/SQLs'

import { getBaseQuery } from './_queries/getBaseQuery'
import { fields } from './fields'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<CountrySummary | null> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const baseQuery = getBaseQuery({ assessment, cycle })

  return client.oneOrNone<CountrySummary>(
    `
      ${baseQuery}
      select ${SQLs.fieldsJoined(fields, 'cs')}, c.status
      from country_summary cs
           left join ${schemaCycle}.country c using (country_iso)
      where cs.country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
