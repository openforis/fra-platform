import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'

import { getNDPSelect } from './_getNDPSelect'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | undefined> => {
  const { assessment, countryIso, cycle, year } = props

  const select = getNDPSelect({ assessment, cycle })

  return client.oneOrNone<OriginalDataPoint>(
    `${select}
     where odp.country_iso = $(countryIso) and odp.year = $(year);`,
    { countryIso, year },
    OriginalDataPointAdapter
  )
}
