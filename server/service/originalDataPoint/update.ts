import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'

export const update = async (props: { id: string; odp: ODP }): Promise<ODP> => {
  const { id, odp } = props
  return OriginalDataPointRepository.update({ id, odp })
}
