import { Express } from 'express'

import { BiomassStockDownload } from './download'

export const BiomassStockApi = {
  init: (express: Express): void => {
    BiomassStockDownload.init(express)
  },
}
