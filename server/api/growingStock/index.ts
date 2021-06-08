import { Express } from 'express'
import { GrowingStockCreate } from '@server/api/growingStock/create'
import { GrowingStockGet } from '@server/api/growingStock/get'

export const GrowingStockApi = {
  init: (express: Express): void => {
    GrowingStockCreate.init(express)
    GrowingStockGet.init(express)
  },
}
