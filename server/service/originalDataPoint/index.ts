import { create } from '@server/service/originalDataPoint/create'
import { getMany } from '@server/service/originalDataPoint/getMany'
import { remove } from '@server/service/originalDataPoint/remove'

export const OriginalDataPointService = {
  create,
  getMany,
  remove,
}
