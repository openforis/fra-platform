import { Express } from 'express'

import { ApiEndPoint } from '@meta/api/endpoint'

import { biomassStockDownload } from './download'

export const BiomassStockApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.BiomassStock.download(), biomassStockDownload)
  },
}
