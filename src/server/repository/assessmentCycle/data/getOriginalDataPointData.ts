import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordCountryData } from 'meta/data'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { OriginalDataPointQueries } from 'server/repository/assessmentCycle/originalDataPoint/queries'

type Props = {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}

export const getOriginalDataPointData = (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, countryISOs, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const selectFrom = `${schemaCycle}.original_data_point_data`

  return client.one<RecordCountryData>(
    OriginalDataPointQueries.getOriginalDataPointData({ countryISOs, selectFrom }),
    [countryISOs],
    ({ data }) => Objects.camelize(data)
  )
}
