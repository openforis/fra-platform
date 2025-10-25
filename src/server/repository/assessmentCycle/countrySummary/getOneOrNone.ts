import { Objects } from 'utils/objects'

import { CountryIso, CountrySummary } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'

import { BaseProtocol, DB } from 'server/db'

import { getBaseQuery } from './_queries/getBaseQuery'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  lang?: Lang
}

export const getOneOrNone = async (props: Props, client: BaseProtocol = DB): Promise<CountrySummary | null> => {
  const { assessment, countryIso, cycle, lang = Lang.en } = props

  const baseQuery = getBaseQuery({ assessment, cycle })

  return client.oneOrNone<CountrySummary>(
    `
      ${baseQuery}
      select *
      from country_summary
      where country_iso = $(countryIso)
    `,
    { countryIso, lang },
    Objects.camelize
  )
}
