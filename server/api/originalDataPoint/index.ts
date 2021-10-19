import { Express } from 'express'
import { OdpCreate } from '@server/api/originalDataPoint/create'
import { OdpRemove } from '@server/api/originalDataPoint/remove'

export const OriginalDataPointApi = {
  init: (express: Express): void => {
    OdpCreate.init(express)
    OdpRemove.init(express)
  },
}
