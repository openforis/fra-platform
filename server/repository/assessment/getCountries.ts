import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Country } from '@core/country'

export const getCountries = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

  return client
    .many<Array<Country>>(
      `
        select country_iso from ${assessmentName}.country;
    `
    )
    .then((data) => Objects.camelize(data).map((d: Country) => d.countryIso))
}
