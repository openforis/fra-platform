import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { getReviewStatus } from 'server/api/cycleData/review/getReviewStatus'
import { getReviewSummary } from 'server/api/cycleData/review/getReviewSummary'
import { AuthMiddleware } from 'server/middleware/auth'

export const ReviewApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.CycleData.Review.status(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.CycleData.Review.summary(), AuthMiddleware.requireView, getReviewSummary)
  },
}
