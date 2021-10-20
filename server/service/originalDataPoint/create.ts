import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'

export const create = async (props: { countryIso: string }): Promise<ODP> => {
  const { countryIso } = props
  return OriginalDataPointRepository.create({ countryIso })
}
