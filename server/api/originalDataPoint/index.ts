import { Express } from 'express'
import { OdpCreate } from '@server/api/originalDataPoint/create'
import { OdpRemove } from '@server/api/originalDataPoint/remove'
import { OdpGet } from '@server/api/originalDataPoint/get'
import { OdpUpdate } from '@server/api/originalDataPoint/update'

export const OriginalDataPointApi = {
  init: (express: Express): void => {
    OdpCreate.init(express)
    OdpGet.init(express)
    OdpRemove.init(express)
    OdpUpdate.init(express)
  },
}
