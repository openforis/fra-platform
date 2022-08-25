import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteOriginalDataPoint } from './deleteOriginalDataPoint'
import { getDescription } from './getDescription'
import { getOriginalDataPoint } from './getOdp'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getOriginalDataPoints } from './getOriginalDataPoints'
import { getReservedYears } from './getReservedYears'
import { getReviewStatus } from './getReviewStatus'
import { getReviewSummary } from './getReviewSummary'
import { getSectionMetadata } from './getSectionMetadata'
import { getSections } from './getSections'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { upsertDescription } from './upsertDescription'

export const AssessmentApi = {
  init: (express: Express): void => {
    // OriginalDataPoint // entry
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.ReservedYears.many(),
      AuthMiddleware.requireView,
      getReservedYears
    )

    express.post(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, createOriginalDataPoint)
    express.delete(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, deleteOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireView, getOriginalDataPoint)
    express.put(ApiEndPoint.Assessment.OriginalDataPoint.one(), AuthMiddleware.requireEdit, updateOriginalDataPoint)

    express.get(ApiEndPoint.Assessment.OriginalDataPoint.many(), AuthMiddleware.requireView, getOriginalDataPoints)

    // OriginalDataPoint // table
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.TableData.one(),
      AuthMiddleware.requireView,
      getOriginalDataPointData
    )

    // Sections
    // requireView: We don't pass table for sections - always allow read
    express.get(ApiEndPoint.Assessment.sections(), AuthMiddleware.requireView, getSections)
    express.get(ApiEndPoint.Sections.metadata(), AuthMiddleware.requireView, getSectionMetadata)
    express.get(ApiEndPoint.Assessment.Data.descriptions(), AuthMiddleware.requireView, getDescription)
    express.put(ApiEndPoint.Assessment.Data.descriptions(), AuthMiddleware.requireEdit, upsertDescription)

    // Review
    express.get(ApiEndPoint.Review.status.many(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.Review.summary.many(), AuthMiddleware.requireView, getReviewSummary)
  },
}
