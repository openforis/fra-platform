import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ODPReservedYear } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getReservedYears = async (
  params: {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
  },
  client: BaseProtocol = DB
): Promise<Array<ODPReservedYear>> => {
  const { assessment, cycle, countryIso } = params

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
