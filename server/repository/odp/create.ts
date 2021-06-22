import { CountryIso } from '@core/country'
import { BaseProtocol, DB } from '@server/db'

export const create = async (options: { countryIso: CountryIso }, client: BaseProtocol = DB) => {
  const { countryIso } = options
  await client.query('INSERT INTO odp (country_iso ) VALUES ($1)', [countryIso])
  const resSelectId = await client.query('SELECT last_value FROM odp_id_seq')
  const odpId = resSelectId?.[0]?.last_value
  return odpId
}
