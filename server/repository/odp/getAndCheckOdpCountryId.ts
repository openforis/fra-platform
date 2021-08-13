import { checkCountryAccess } from '@server/utils/accessControl'
import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/auth'
import { CountryIso } from '@core/country'

export const getAndCheckOdpCountryId = async (
  options: { odpId: number | string; user: User },
  client: BaseProtocol = DB
): Promise<CountryIso> => {
  const { odpId, user } = options
  const q = await client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
  // TODO: Remove after migration to pg-promise done
  const res = q.rows ? q.rows : q
  const [{ country_iso: countryIso }] = res
  checkCountryAccess(countryIso, user)
  return countryIso
}
