import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Country } from '@core/country'

export const getCountries = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

  return client
    .many<Array<Country>>(
      `
          select c2.country_iso from ${assessmentName}.country c left join country c2 on c.country_iso = c2.country_iso;
    `
    )
    .then((data) => Objects.camelize(data).map((country: Country) => country.countryIso))
}
