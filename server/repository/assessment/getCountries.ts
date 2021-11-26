import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Country } from '@core/country'

export const getCountries = async (props: { name: string }, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

  return client
    .many<Array<Country>>(
      `
        select * from ${assessmentName}.assessment_country;
    `
    )
    .then((data) => Objects.camelize(data))
}
