import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'

export const get = async (props: { id: string }): Promise<ODP> => {
  const { id } = props
  const odp = await OriginalDataPointRepository.get({ id })
  return odp
}
