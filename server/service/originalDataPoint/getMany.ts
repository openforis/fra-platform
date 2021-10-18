import { ODP } from '@core/odp'
import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { validateDataPoint } from '@common/validateOriginalDataPoint'

export const getMany = async (props: { countryIso: string; validate?: boolean }): Promise<Array<ODP>> => {
  const { countryIso, validate } = props
  const odps = await OriginalDataPointRepository.getMany({ countryIso })
  if (validate) {
    return odps.map((odp: ODP): ODP => ({ ...odp, validationStatus: validateDataPoint(odp) }))
  }
  return odps
}
