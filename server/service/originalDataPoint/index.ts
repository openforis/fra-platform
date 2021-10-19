import { create } from '@server/service/originalDataPoint/create'
import { get } from '@server/service/originalDataPoint/get'
import { getMany } from '@server/service/originalDataPoint/getMany'
import { remove } from '@server/service/originalDataPoint/remove'

export const OriginalDataPointService = {
  create,
  get,
  getMany,
  remove,
}
