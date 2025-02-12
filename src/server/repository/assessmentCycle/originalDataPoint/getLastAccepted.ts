import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { OriginalDataPointQueries } from 'server/repository/assessmentCycle/originalDataPoint/queries'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

export const getLastAccepted = async (props: Props, client: BaseProtocol = DB): Promise<OriginalDataPoint | null> => {
  const { assessment, cycle, countryIso, year } = props

  return client.oneOrNone<OriginalDataPoint>(
    `with activities as (${OriginalDataPointQueries.getLastAcceptedActivity({
      assessment,
      cycle,
      countryISOs: [countryIso],
      year,
    })})
     select a.target as odp
     from activities a
     where a.row_number = 1
    `,
    [],
    ({ odp }) => odp
  )
}
