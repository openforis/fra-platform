import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { report } from 'server/api/cycleData/print/report'
import { AuthMiddleware } from 'server/middleware/auth'

export const PrintApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Print.Report.one(), AuthMiddleware.requireView, report)
  },
}
