import { ApiEndPoint } from '@common/api/endpoint'
import { Express } from 'express'

import { AuthMiddleware } from '@server/middleware/auth'

import { createOriginalDataPoint } from './createOriginalDataPoint'
import { deleteOriginalDataPoint } from './deleteOriginalDataPoint'
import { getActivityLog } from './getActivityLog'
import { getDescription } from './getDescription'
import { getOriginalDataPoint } from './getOdp'
import { getOriginalDataPointData } from './getOriginalDataPointData'
import { getReservedYears } from './getReservedYears'
import { getReviewStatus } from './getReviewStatus'
import { getReviewSummary } from './getReviewSummary'
import { getSectionMetadata } from './getSectionMetadata'
import { getSections } from './getSections'
import { getTableData } from './getTableData'
import { persistNodeValues } from './persistNodeValues'
import { postCountry } from './postCountry'
import { postEstimation } from './postEstimation'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { upsertDescription } from './upsertDescription'

export const AssessmentApi = {
  init: (express: Express): void => {
    // Country
    express.post(ApiEndPoint.Assessment.country(), AuthMiddleware.requireEdit, postCountry)

    // Estimation
    express.post(ApiEndPoint.Assessment.TableData.Estimate.many(), AuthMiddleware.requireEdit, postEstimation)

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

    // OriginalDataPoint // table
    express.get(
      ApiEndPoint.Assessment.OriginalDataPoint.TableData.one(),
      AuthMiddleware.requireView,
      getOriginalDataPointData
    )

    // TableData
    express.get(ApiEndPoint.Assessment.TableData.one(), AuthMiddleware.requireView, getTableData)
    express.patch(ApiEndPoint.CycleData.Nodes.many(), AuthMiddleware.requireEdit, persistNodeValues)

    // Sections
    // requireView: We don't pass table for sections - always allow read
    express.get(ApiEndPoint.Assessment.sections(), AuthMiddleware.requireView, getSections)
    express.get(ApiEndPoint.Assessment.Sections.Metadata.many(), AuthMiddleware.requireView, getSectionMetadata)
    express.get(ApiEndPoint.Assessment.Data.descriptions(), AuthMiddleware.requireView, getDescription)
    express.put(ApiEndPoint.Assessment.Data.descriptions(), AuthMiddleware.requireEdit, upsertDescription)

    // Review
    express.get(ApiEndPoint.Review.status.many(), AuthMiddleware.requireView, getReviewStatus)
    express.get(ApiEndPoint.Review.summary.many(), AuthMiddleware.requireView, getReviewSummary)

    // Activity Log
    express.get(ApiEndPoint.Assessment.activityLog(), getActivityLog)
  },
}
