import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'

export const getPrevious = async (props: { id: string }): Promise<ODP> => {
  const { id } = props
  const odp = await OriginalDataPointRepository.get({ id })
  const { countryIso, year } = odp
  const odps = await OriginalDataPointRepository.getMany({ countryIso })
  return odps.filter((o) => o.year < year).pop()
}
