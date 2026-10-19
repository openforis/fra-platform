import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getHistory } from 'server/api/cycleData/history/getHistory'
import { getHistoryCount } from 'server/api/cycleData/history/getHistoryCount'
import { AuthMiddleware } from 'server/middleware/auth'

export const HistoryApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.History.Activities.one(), AuthMiddleware.requireViewHistory, getHistory)
    express.get(ApiEndPoint.CycleData.History.Activities.count(), AuthMiddleware.requireViewHistory, getHistoryCount)
  },
}
