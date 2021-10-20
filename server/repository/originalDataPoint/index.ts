import { getMany, getManyNormalized } from '@server/repository/originalDataPoint/getMany'
import { get } from '@server/repository/originalDataPoint/get'
import { create } from '@server/repository/originalDataPoint/create'
import { remove } from '@server/repository/originalDataPoint/remove'
import { update } from '@server/repository/originalDataPoint/update'

export const OriginalDataPointRepository = {
  create,
  getMany,
  get,
  getManyNormalized,
  remove,
  update,
}
