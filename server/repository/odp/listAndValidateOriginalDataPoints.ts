import { validateDataPoint } from '@common/validateOriginalDataPoint'
import { listOriginalDataPoints } from './listOriginalDataPoints'

export const listAndValidateOriginalDataPoints = async (countryIso: any) => {
  const odps = await listOriginalDataPoints(countryIso)
  return odps.map((odp: any) => ({ ...odp, validationStatus: validateDataPoint(odp) }))
}
