import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getActivities } from 'server/api/cycleData/activities/getActivities'
import { getActivitiesCount } from 'server/api/cycleData/activities/getActivitiesCount'
import { AuthMiddleware } from 'server/middleware/auth'

export const ActivitiesApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.activities(), AuthMiddleware.requireView, getActivities)
    express.get(ApiEndPoint.CycleData.activitiesCount(), AuthMiddleware.requireView, getActivitiesCount)
  },
}
