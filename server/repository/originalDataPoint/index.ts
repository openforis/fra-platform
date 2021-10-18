import { getMany, getManyNormalized } from '@server/repository/originalDataPoint/getMany'
import { create } from '@server/repository/originalDataPoint/create'

export const OriginalDataPointRepository = {
  create,
  getMany,
  getManyNormalized,
}
