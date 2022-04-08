import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Country, CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

export const getCountry = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { countryIso, assessment, cycle } = props

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<Country>(
    `
          select * from ${assessmentCycleName}.country c where c.country_iso = $1
    `,
    [countryIso],
    Objects.camelize
  )
}
