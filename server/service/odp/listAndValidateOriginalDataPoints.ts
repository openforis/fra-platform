import { listOriginalDataPoints } from '@server/repository/odp/listOriginalDataPoints'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import { CountryIso } from '@core/country'
import { BaseProtocol, DB } from '@server/db'

export const listAndValidateOriginalDataPoints = async (
  options: { countryIso: CountryIso },
  // @ts-ignore TODO: Update listOriginalDataPoints to accept client param
  client: BaseProtocol = DB
) => {
  const { countryIso } = options
  const odps = await listOriginalDataPoints(countryIso)
  return odps.map((odp: any) => ({ ...odp, validationStatus: validateDataPoint(odp) }))
}
