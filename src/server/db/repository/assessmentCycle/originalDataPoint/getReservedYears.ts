import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ODPReservedYear } from 'meta/assessment/originalDataPoint'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const getReservedYears = async (
  params: {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
  },
  client: BaseProtocol = DB
): Promise<Array<ODPReservedYear>> => {
  const { assessment, countryIso, cycle } = params

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<ODPReservedYear>(
    `
      select id, year, jsonb_array_length(national_classes) AS national_classes
      from ${schemaName}.original_data_point
      where country_iso = $1
    `,
    [countryIso],
    (row) => Objects.camelize(row)
  )
}
