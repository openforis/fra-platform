import { OdpRepository } from '@server/repository'
import { validateDataPoint } from '@common/validateOriginalDataPoint'
import { CountryIso } from '@core/country'
import { BaseProtocol, DB } from '@server/db'

export const listAndValidateOriginalDataPoints = async (
  options: { countryIso: CountryIso },
  client: BaseProtocol = DB
) => {
  const { countryIso } = options
  const odps = await OdpRepository.listOriginalDataPoints({ countryIso }, client)
  return odps.map((odp: any) => ({ ...odp, validationStatus: validateDataPoint(odp) }))
}
