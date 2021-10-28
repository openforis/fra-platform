import { create } from '@server/service/originalDataPoint/create'
import { get } from '@server/service/originalDataPoint/get'
import { getMany, getManyNormalized } from '@server/service/originalDataPoint/getMany'
import { remove } from '@server/service/originalDataPoint/remove'
import { update } from '@server/service/originalDataPoint/update'
import { getReservedYears } from '@server/service/originalDataPoint/getReservedYears'

export const OriginalDataPointService = {
  create,
  get,
  getReservedYears,
  getMany,
  getManyNormalized,
  remove,
  update,
}
