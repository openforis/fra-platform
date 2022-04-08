import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Country, CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

export const updateCountry = async (
  props: { country: Country; countryIso: CountryIso; assessment: Assessment; cycle: Cycle },
  client: BaseProtocol = DB
): Promise<Country> => {
  const { country, countryIso, assessment, cycle } = props

  const assessmentCycleName = Schemas.getNameCycle(assessment, cycle)

  return client.one<Country>(
    `
        update ${assessmentCycleName}.country
        set props = props || $2
        where country_iso = $1
        returning *;

    `,
    [countryIso, JSON.stringify(country.props)],
    Objects.camelize
  )
}
