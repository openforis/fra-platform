import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getOne = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso: CountryIso; year: string },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, cycle, countryIso, year } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.one<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1 and year = $2;`,
    [countryIso, year],
    Objects.camelize
  )
}
