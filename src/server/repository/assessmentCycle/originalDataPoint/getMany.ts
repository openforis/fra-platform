import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getMany = async (
  props: { assessment: Assessment; cycle: Cycle; countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, cycle, countryIso } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<OriginalDataPoint>(
    `select * from ${schemaName}.original_data_point where country_iso = $1;`,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
