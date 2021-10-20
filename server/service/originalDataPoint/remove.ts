import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'

export const remove = async (props: { id: string }): Promise<ODP> => {
  const { id } = props
  const odp = await OriginalDataPointRepository.remove({ id })
  return odp
}
