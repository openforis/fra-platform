import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Cycle } from '@meta/assessment'
import { CountryIso } from '@meta/area'

export const getReservedYears = async (
  params: {
    assessment: Assessment
    assessmentCycle: Cycle
    countryIso: CountryIso
  },
  client: BaseProtocol = DB
): Promise<Array<number>> => {
  const { assessment, assessmentCycle, countryIso } = params

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)
  const years = await client.many(
    `
        select year from ${schemaName}.original_data_point where country_iso = $1
    `,
    [countryIso]
  )

  return years.map(({ year }) => year)
}
