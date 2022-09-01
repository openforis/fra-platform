import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export const getReservedYears = async (
  params: {
    assessment: Assessment
    cycle: Cycle
    countryIso: CountryIso
  },
  client: BaseProtocol = DB
): Promise<Array<number>> => {
  const { assessment, cycle, countryIso } = params

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  return client.map<number>(
    `select year from ${schemaName}.original_data_point where country_iso = $1`,
    [countryIso],
    ({ year }) => year
  )
}
