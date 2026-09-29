import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { createEvent } from 'server/api/analytics/createEvent'
import { getTrackingEvents } from 'server/api/analytics/getTrackingEvents'
import { AuthMiddleware } from 'server/middleware/auth'

export const AnalyticsApi = {
  init: (express: Express): void => {
    express.post(ApiEndPoint.Analytics.event(), createEvent)

    express.get(ApiEndPoint.Analytics.trackingEvents(), AuthMiddleware.requireAdmin, getTrackingEvents)
  },
}
