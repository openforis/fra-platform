import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import {
  OriginalDataPointAdapterDeprecated,
  OriginalDataPointDBDeprecated,
} from 'server/db/repository/adapter/originalDataPoint'
import { OriginalDataPointQueries } from 'server/db/repository/assessmentCycle/originalDataPoint/queries'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getLastAccepted = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | null> => {
  const { assessment, countryIso, cycle, year } = props

  const _props = { assessment, cycle, countryISOs: [countryIso], year }

  return client.oneOrNone<OriginalDataPoint>(
    `with activities as (${OriginalDataPointQueries.getLastAcceptedActivity(_props)})
     select a.target as odp
     from activities a
     where a.row_number = 1
    `,
    [],
    (row?: { odp: OriginalDataPointDBDeprecated } | null) => (row ? OriginalDataPointAdapterDeprecated(row.odp) : null)
  )
}
