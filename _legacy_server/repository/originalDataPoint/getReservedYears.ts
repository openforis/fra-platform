import { BaseProtocol, DB } from '@server/db'
import { CountryIso } from '@core/country'

export const getReservedYears = async (
  props: { countryIso: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<number>> => {
  const { countryIso } = props

  const years = await client.many(
    `
        select year from original_data_point where country_iso = $1
    `,
    [countryIso]
  )

  return years.map(({ year }) => year)
}
