import { create } from '@server/controller/originalDataPoint/create'
import { get } from '@server/controller/originalDataPoint/get'
import { getPrevious } from '@server/controller/originalDataPoint/getPrevious'
import { getMany, getManyNormalized } from '@server/controller/originalDataPoint/getMany'
import { remove } from '@server/controller/originalDataPoint/remove'
import { update } from '@server/controller/originalDataPoint/update'
import { getReservedYears } from '@server/controller/originalDataPoint/getReservedYears'

export const OriginalDataPointService = {
  create,
  get,
  getPrevious,
  getReservedYears,
  getMany,
  getManyNormalized,
  remove,
  update,
}
