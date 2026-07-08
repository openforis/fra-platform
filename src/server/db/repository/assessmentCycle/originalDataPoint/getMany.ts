import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'

import { getNDPSelect } from './_getNDPSelect'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryISOs, cycle } = props

  const select = getNDPSelect({ assessment, cycle })

  return client.map<OriginalDataPoint>(
    `${select} where odp.country_iso in ($(countryISOs:csv));`,
    { countryISOs },
    OriginalDataPointAdapter
  )
}
