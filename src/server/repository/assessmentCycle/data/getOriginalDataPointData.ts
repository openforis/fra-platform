import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointQueries } from 'server/repository/assessmentCycle/originalDataPoint/queries'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

export const getOriginalDataPointData = (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, cycle, countryISOs } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const selectFrom = `${schemaCycle}.original_data_point_data`

  return client.one<RecordCountryData>(
    OriginalDataPointQueries.getOriginalDataPointData({ countryISOs, selectFrom }),
    [countryISOs],
    ({ data }) => Objects.camelize(data)
  )
}
