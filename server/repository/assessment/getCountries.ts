import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'

export const getCountries = async (
  props: { name: string },
  client: BaseProtocol = DB
): Promise<Array<{ countryIso: string }>> => {
  const { name } = props

  const assessmentName = `assessment_${name}`

  return client
    .many<{ countryIso: string }>(
      `
        select * from ${assessmentName}.assessment_country;
    `
    )
    .then((data) => Objects.camelize(data))
}
