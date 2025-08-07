import { Objects } from 'utils/objects'

import { CountryIso, CountrySummary } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
}

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<CountrySummary | null> => {
  const { assessment, countryIso, cycle } = props

  const baseQuery = getBaseQuery({ assessment, cycle })

  return client.oneOrNone<CountrySummary>(
    `
      ${baseQuery}
      select *
      from country_summary
      where country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
