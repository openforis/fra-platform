import { checkCountryAccess } from '@server/utils/accessControl'

export const getAndCheckOdpCountryId = async (client: any, odpId: any, user: any) => {
  const res = await client.query('SELECT country_iso FROM odp WHERE id = $1', [odpId])
  const countryIso = res.rows[0].country_iso
  checkCountryAccess(countryIso, user)
  return countryIso
}
