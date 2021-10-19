import { getMany, getManyNormalized } from '@server/repository/originalDataPoint/getMany'
import { create } from '@server/repository/originalDataPoint/create'
import { remove } from '@server/repository/originalDataPoint/remove'

export const OriginalDataPointRepository = {
  create,
  getMany,
  getManyNormalized,
  remove,
}
