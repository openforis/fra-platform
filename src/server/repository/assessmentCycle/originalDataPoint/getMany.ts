import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter/originalDataPoint'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, countryIso, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1;`,
    [countryIso],
    OriginalDataPointAdapter
  )
}
