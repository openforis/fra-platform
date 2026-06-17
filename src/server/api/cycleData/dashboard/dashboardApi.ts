import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getDashboardItems } from 'server/api/cycleData/dashboard/getDashboardItems'

export const DashboardApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Dashboard.one(), getDashboardItems)
  },
}
