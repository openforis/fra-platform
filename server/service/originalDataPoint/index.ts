import { create } from '@server/service/originalDataPoint/create'
import { get } from '@server/service/originalDataPoint/get'
import { getMany, getManyNormalized } from '@server/service/originalDataPoint/getMany'
import { remove } from '@server/service/originalDataPoint/remove'
import { update } from '@server/service/originalDataPoint/update'

export const OriginalDataPointService = {
  create,
  get,
  getMany,
  getManyNormalized,
  remove,
  update,
}
