import { Express } from 'express'
import { OdpCreate } from '@server/api/originalDataPoint/create'

export const OriginalDataPointApi = {
  init: (express: Express): void => {
    OdpCreate.init(express)
  },
}
